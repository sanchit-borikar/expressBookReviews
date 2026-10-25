# cURL commands for the IBM assignment

Start the API from the repository root using `npm install` then `npm start`. Keep the server running while you run the review commands. Use the same cookie file for login, add-review, and delete-review.

## Task 1 — githubrepo
```bash
curl -s https://api.github.com/repos/sanchit-borikar/expressBookReviews
```
The current repo is a fork; the response should include `"fork": true` and its `parent` should be `ibm-developer-skills-network/expressBookReviews`.

## Task 2 — getallbooks
```bash
curl -s http://localhost:5000/
```

## Task 3 — getbooksbyISBN
```bash
curl -s http://localhost:5000/isbn/1
```

## Task 4 — getbooksbyauthor
```bash
curl -s "http://localhost:5000/author/Chinua%20Achebe"
```

## Task 5 — getbooksbytitle
```bash
curl -s "http://localhost:5000/title/Things%20Fall%20Apart"
```

## Task 6 — getbookreview
Run before adding a review:
```bash
curl -s http://localhost:5000/review/1
```

## Task 7 — register
```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```

## Task 8 — login
```bash
curl -s -c cookies.txt -b cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```
The response contains a dynamically generated JWT token.

## Task 9 — reviewadded
Run after login, without restarting the server:
```bash
curl -s -c cookies.txt -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d '{"review":"A memorable and thought-provoking book."}'
```

## Task 10 — deletereview
Run after adding the review:
```bash
curl -s -c cookies.txt -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```

Paste actual API output into the course fields. Do not paste a placeholder in place of the actual login token.
