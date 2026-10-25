# Assignment answer reference

These are the expected responses from the committed source code. They are not claimed to be output captured from a local server run. For live stateful outputs (especially login), use the exact output from the server.

## Task 1 — githubrepo
Command:
```bash
curl -s https://api.github.com/repos/sanchit-borikar/expressBookReviews | jq '{full_name, fork, parent: .parent.full_name, source: .source.full_name}'
```

Verified GitHub metadata:
```json
{
  "full_name": "sanchit-borikar/expressBookReviews",
  "fork": true,
  "parent": "ibm-developer-skills-network/expressBookReviews",
  "source": "ibm-developer-skills-network/expressBookReviews"
}
```
Note: the assignment text names a singular `expressBookReview`, but the publicly available IBM repository and the verified fork use `expressBookReviews` (plural).

## Task 2 — getallbooks
Command:
```bash
curl -s http://localhost:5000/
```
Expected output:
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}},"2":{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},"3":{"author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}},"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},"9":{"author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},"10":{"author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}}
```

## Task 3 — getbooksbyISBN
Command: `curl -s http://localhost:5000/isbn/1`

Expected output:
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Task 4 — getbooksbyauthor
Command: `curl -s "http://localhost:5000/author/Chinua%20Achebe"`

Expected output:
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Task 5 — getbooksbytitle
Command: `curl -s "http://localhost:5000/title/Things%20Fall%20Apart"`

Expected output:
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Task 6 — getbookreview
Run before adding a review.
Command: `curl -s http://localhost:5000/review/1`

Expected output:
```json
{}
```

## Task 7 — register
Command:
```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```

Expected response when that username is first registered in the current server process:
```json
{"message":"User successfully registered."}
```

## Task 8 — login
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"sanchit_demo","password":"BookReview123!"}'
```

The response includes `message`, `username`, and a dynamically generated `accessToken`. The token depends on execution time and should not be replaced by a placeholder in a claim of actual output.

## Task 9 — reviewadded
Run after login, without restarting the server.
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d '{"review":"A memorable and thought-provoking book."}'
```

Expected output:
```json
{"message":"Review added or updated successfully.","reviews":{"sanchit_demo":"A memorable and thought-provoking book."}}
```

## Task 10 — deletereview
Run after adding the review.
Command:
```bash
curl -s -c cookies.txt -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```

Expected output:
```json
{"message":"Review deleted successfully.","reviews":{}}
```

## Task 11 — general.js
Submit this public file URL:
https://github.com/sanchit-borikar/expressBookReviews/blob/main/general.js
