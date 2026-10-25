# Assignment answer reference

These examples are expected responses based on the checked source code; they are not claimed to be output captured from a live runtime. Use the actual output from your own API run.

## Task 1 — githubrepo
Command:
```bash
curl -s https://api.github.com/repos/sanchit-borikar/expressBookReviews
```
A compact check using jq:
```bash
curl -s https://api.github.com/repos/sanchit-borikar/expressBookReviews | jq '{full_name, fork, parent: .parent.full_name, source: .source.full_name}'
```
Current repository metadata confirms `fork: true`, with parent and source `ibm-developer-skills-network/expressBookReviews`.

## Task 2 — getallbooks
Command: `curl -s http://localhost:5000/`
Expected response has the ten seed books in `final_project/router/booksdb.js`, with keys `1` through `10`.

## Task 3 — getbooksbyISBN
Command: `curl -s http://localhost:5000/isbn/1`
Expected: `{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}`

## Task 4 — getbooksbyauthor
Command: `curl -s "http://localhost:5000/author/Chinua%20Achebe"`
Expected: `{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}`

## Task 5 — getbooksbytitle
Command: `curl -s "http://localhost:5000/title/Things%20Fall%20Apart"`
Expected: `{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}`

## Task 6 — getbookreview
Command: `curl -s http://localhost:5000/review/1`
Run before any review is added; expected response: `{}`.

## Task 7 — register
Command:
```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```
Expected on first registration: `{"message":"User successfully registered."}`.

## Task 8 — login
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```
The response includes a real, dynamically generated `accessToken`; copy that actual response.

## Task 9 — reviewadded
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d '{"review":"A memorable and thought-provoking book."}'
```
Expected after login: `{"message":"Review added or updated successfully.","reviews":{"sanchit_demo":"A memorable and thought-provoking book."}}`.

## Task 10 — deletereview
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```
Expected after a review has been added: `{"message":"Review deleted successfully.","reviews":{}}`.

## Task 11 — general.js
Submit: https://github.com/sanchit-borikar/expressBookReviews/blob/main/general.js
