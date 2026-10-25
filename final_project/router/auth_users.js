const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');
const registeredUsers = express.Router();
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'ibm-book-review-development-secret';

const isValid = (username) => users.some((user) => user.username === username);
const authenticatedUser = (username, password) =>
  users.some((user) => user.username === username && user.password === password);

// Login a previously registered user and create a JWT stored in the session.
registeredUsers.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password || !authenticatedUser(username, password)) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  req.session.authorization = { accessToken, username };
  return res.status(200).json({ message: 'User successfully logged in.', username, accessToken });
});

// Add or update the logged-in user's review for a book.
registeredUsers.put('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  const review = typeof req.body?.review === 'string' ? req.body.review.trim() : '';
  if (!review) return res.status(400).json({ message: 'A non-empty review is required.' });
  book.reviews[req.user.username] = review;
  return res.status(200).json({ message: 'Review added or updated successfully.', reviews: book.reviews });
});

// A logged-in user can delete their own review.
registeredUsers.delete('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  if (!Object.prototype.hasOwnProperty.call(book.reviews, req.user.username)) {
    return res.status(404).json({ message: 'No review found for this user and book.' });
  }
  delete book.reviews[req.user.username];
  return res.status(200).json({ message: 'Review deleted successfully.', reviews: book.reviews });
});

module.exports.authenticated = registeredUsers;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
module.exports.JWT_SECRET = JWT_SECRET;
