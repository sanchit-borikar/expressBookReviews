# IBM Express Book Reviews — Final Project

This is Sanchit's public fork of the IBM Express Book Reviews project. It implements book retrieval, user registration and login, and review create/update/delete operations.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

The API listens at `http://localhost:5000`. Keep the server running and use a second terminal for the cURL requests below.

## Axios retrieval client — Task 11

The root-level `general.js` uses Axios with `async/await` to retrieve all books, a book by ID/ISBN, books by author, books by title, and reviews.

```bash
node general.js all
node general.js isbn 1
node general.js author "Chinua Achebe"
node general.js title "Things Fall Apart"
node general.js review 1
```

## API endpoints

- `GET /` — list all books
- `GET /isbn/:isbn` — retrieve a book by its numeric identifier
- `GET /author/:author` — search by author (case-insensitive substring)
- `GET /title/:title` — search by title (case-insensitive substring)
- `GET /review/:isbn` — get the reviews for a book
- `POST /register` — register a user with a username and password
- `POST /customer/login` — log in and receive a JWT
- `PUT /customer/auth/review/:isbn` — add or update the logged-in user's review
- `DELETE /customer/auth/review/:isbn` — delete the logged-in user's own review

## Capture assignment responses

Commands for Tasks 1–10 are documented in `submission_samples/curl-commands.md`; a brief answer reference is in `submission_samples/answer-reference.md`. Use real output from your own API run for the assignment rather than treating illustrative expected responses as execution logs.

## Demo security limitations

This is a learning project. Users are held in memory, passwords are not hashed, and fallback session/JWT secrets are for local development only. Do not use these defaults in production.
