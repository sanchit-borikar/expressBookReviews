// Axios client for Task 11: book retrieval with async/await.
const axios = require('axios');
const BASE_URL = process.env.BOOK_REVIEW_API || 'http://localhost:5000';

async function getAllBooks() {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data;
}
async function getBooksByISBN(isbn) {
  const response = await axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`);
  return response.data;
}
async function getBooksByAuthor(author) {
  const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
  return response.data;
}
async function getBooksByTitle(title) {
  const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
  return response.data;
}
async function getBookReview(isbn) {
  const response = await axios.get(`${BASE_URL}/review/${encodeURIComponent(isbn)}`);
  return response.data;
}

async function main() {
  const [operation = 'all', ...args] = process.argv.slice(2);
  try {
    let result;
    switch (operation.toLowerCase()) {
      case 'all': result = await getAllBooks(); break;
      case 'isbn':
        if (!args[0]) throw new Error('Usage: node general.js isbn <book-id>');
        result = await getBooksByISBN(args[0]); break;
      case 'author':
        if (!args.length) throw new Error('Usage: node general.js author <author name>');
        result = await getBooksByAuthor(args.join(' ')); break;
      case 'title':
        if (!args.length) throw new Error('Usage: node general.js title <title text>');
        result = await getBooksByTitle(args.join(' ')); break;
      case 'review':
        if (!args[0]) throw new Error('Usage: node general.js review <book-id>');
        result = await getBookReview(args[0]); break;
      default: throw new Error('Use one of: all, isbn, author, title, review');
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ error: error.response?.data || error.message }, null, 2));
    process.exitCode = 1;
  }
}
module.exports = { getAllBooks, getBooksByISBN, getBooksByAuthor, getBooksByTitle, getBookReview };
if (require.main === module) main();
