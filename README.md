# sword_testathon
# QuickWallet Testathon — Participant Guide

---

## Welcome

Welcome to the QuickWallet Testathon! Over the next 4 hours you will test a web application, find bugs, plan tests, and -hopefully- write some automation. This document contains all you need to get started.

Read it carefully before you start.

---

## The Application

**QuickWallet** is a simple personal banking and wallet application. It allows users to:

- Register an account and log in
- Create multiple wallet accounts in different currencies (EUR, USD, GBP)
- Deposit, withdraw, and transfer funds between accounts
- Set daily and monthly spending limits per account
- View full transaction history
- Manage their profile

There is also an **admin panel** for system administrators with visibility into all users, accounts, and transactions.

---

## Getting Started

You will receive a single file: **`quickwallet.exe`**

### Running the Application

1. Place `quickwallet.exe` in a folder of your choice
2. Run it from Powershell:
3. The application starts and a database file (`quickwallet.db`) is automatically created in the same folder
4. Open your browser and navigate to:

| Interface        | URL                              |
|------------------|----------------------------------|
| Web UI           | http://localhost:8000            |
| Admin Panel      | http://localhost:8000/admin      |
| API Docs (Swagger) | http://localhost:8000/docs     |
| API Docs (ReDoc) | http://localhost:8000/redoc      |
| API Info         | http://localhost:8000/api        |
| User login       | http://localhost:8000/auth/login |


### Default Credentials

| Role  | Username | Password |
|-------|----------|----------|
| Admin | `admin`  | `admin`  |

Regular user accounts must be registered through the application.

---

## Application Features

### User Registration & Login
- Register at `/auth/register` with username, email, full name, and password (min. 6 characters)
- Login at `/auth/login`
- Passwords can be changed from the profile page

### Accounts
- Users can create multiple accounts
- Each account has a unique number in the format `QWxxxxxxxxxx` (QW + 10 digits)
- Supported currencies: **EUR, USD, GBP**
- An optional initial deposit can be provided on account creation
- Account balances are always displayed with 2 decimal places

### Transactions
- **Deposit:** Add funds to any of your accounts
- **Withdraw:** Remove funds (subject to daily and monthly limits)
- **Transfer:** Send funds to any account by its account number (cross-currency transfers are supported with automatic conversion)

### Spending Limits
- Each account has a **daily limit** (default: 1,000) and a **monthly limit** (default: 10,000)
- Limits apply to withdrawals and outgoing transfers
- Limits can be configured per account from the Profile page
- Spending counters can be reset from the Profile page
- **Note:** Daily spending limits should not exceed the monthly limit

### Transaction History
- Full history of all transactions across all accounts is available at `/transactions/history`
- Every transaction is permanently recorded and always accessible

### Currency Conversion
- Transfers between accounts of different currencies are automatically converted
- Exchange rates are fixed and managed by the admin
- Current rates are EUR-based (1 EUR = X currency)

### Admin Panel
- Accessible at `/admin` — admin credentials required
- Features: user management, account overview, transaction log, exchange rate management
- Admins can activate/deactivate users and accounts

---

## API Reference

The application exposes a full REST API. All endpoints are documented interactively at `/docs` (Swagger UI).

### Authentication
| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | /auth/api/login      | Login              |
| POST   | /auth/api/register   | Register new user  |

### Accounts
| Method | Endpoint                              | Description                    |
|--------|---------------------------------------|--------------------------------|
| GET    | /accounts/api/list                    | List your accounts             |
| POST   | /accounts/api/create                  | Create a new account           |
| GET    | /accounts/api/{id}                    | Get account details            |
| GET    | /accounts/api/{id}/transactions       | Get account transactions       |

### Transactions
| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | /transactions/api/deposit       | Deposit funds            |
| POST   | /transactions/api/withdraw      | Withdraw funds           |
| POST   | /transactions/api/transfer      | Transfer funds           |
| GET    | /transactions/api/history       | Get transaction history  |

### Profile
| Method | Endpoint                            | Description                        |
|--------|-------------------------------------|------------------------------------|
| POST   | /profile/change-daily-limit         | Update daily limit for an account  |
| POST   | /profile/change-monthly-limit       | Update monthly limit for an account|
| POST   | /profile/reset-daily-limit          | Reset daily spending counter        |
| POST   | /profile/reset-monthly-limit        | Reset monthly spending counter      |

### Admin (requires admin session)
| Method | Endpoint                        | Description                  |
|--------|---------------------------------|------------------------------|
| GET    | /admin/api/stats                | System statistics            |
| GET    | /admin/api/users                | List all users               |
| GET    | /admin/api/accounts             | List all accounts            |
| GET    | /admin/api/transactions         | List all transactions        |
| GET    | /admin/api/exchange-rates       | Get current exchange rates   |
| POST   | /admin/api/exchange-rates       | Update exchange rates        |

---

## Event Structure

The event is divided into two parts.

### Part 1 — Bug Discovery 

Your goal is to find as many bugs as possible in the QuickWallet application.

**Bug categories and scoring:**

| Category | Points per bug | Description |
|----------|---------------|-------------|
| Easy     | 10 pts        | Findable through normal UI exploration |
| Medium   | 20 pts        | Requires edge cases, tools, or multi-step scenarios |
| Hard     | 40 pts        | Requires technical depth — security, performance, chaining |


#### How to Report a Bug

Submit each bug using the provided reporting form/template. A valid bug report must include:

1. **Title** — short description of the bug
2. **Category** — Easy / Medium / Hard (your assessment)
3. **Steps to Reproduce** — clear, numbered steps that reliably reproduce the issue
4. **Expected Result** — what should have happened
5. **Actual Result** — what actually happened
6. **Evidence** — screenshot, API response, or video where applicable

> Duplicate reports (same bug found by multiple teams) are awarded to the team that submitted first. Partial credit may be given for incomplete but valid reports.

---

### Part 2 — Test Planning, Automation and Test Reporting 

Based on the bugs found in the first half (and any additional ones), your team will:

1. **Write a Test Plan** covering the most critical areas of the application
2. **Automate test cases of your own choice** using any tool or language of your choice
3. Assess whether a new version of the application that will be provided to you is a go or a no go for a live deployment. 

#### Test Plan Requirements
- Identify the key functional areas to test
- Define test cases (positive and negative)
- Prioritise by risk
- State what tools/approaches you would use

#### Automation Requirements
- Scripts must be runnable and produce clear pass/fail output
- Any language or framework is accepted (Python, JavaScript, Postman collections, etc.)
- AI assistance is allowed — but you must understand and be able to explain your code
- Any code you wish to submit, needs to be committed to this repo and pushed to a branch containing your team's name. 

---

## Tools & Resources

You are free to use any tool. Here are some suggestions:

---

## Rules

1. **Do not share bugs** with other teams during the discovery phase
2. **Do not attempt to crash other teams' instances** — each team runs their own copy of the exe
3. **Do not modify the exe** or the database directly — bugs must be reproducible through the application's interfaces (UI or API)
4. **All bugs must be reproducible** — "I saw it once" is not sufficient without steps to reproduce
5. **Submit before time is called** — late submissions will not be accepted
6. Do not push **anything** to main branch. 

---

## Tips

- Start with the UI — click around, try unexpected inputs, check every form
- Read the documentation visible in the app itself (tooltips, notes, descriptions) — it may hint at expected behaviour
- The Swagger UI at `/docs` is your friend — it lists every endpoint and lets you call them directly
- Think about what a banking app *should* guarantee, then try to violate those guarantees
- Not all bugs are in the most obvious places — check history pages, admin panels, success messages
- For the harder bugs, think about concurrency, security, and what happens at the boundaries of the system
- Test both the UI **and** the API separately — they may behave differently
- Create multiple user accounts and test interactions between them

---

## Scoring & Winners

| Category                | Sub-category                        | Points  |
|-------------------------|-------------------------------------|---------|
| Bugs Found              | Low Severity                        | 20      |
|                         | Medium Severity                     | 30      |
|                         | High Severity                       | 50      |
| Bug Reporting Quality   | Clarity & Reproducibility           | 20      |
|                         | Timeliness                          | 10      |
| Test Strategy Plan      | Structure & Coverage                | 30      |
|                         | Creativity & Prioritization         | 10      |
| Automation Suite        | Functionality                       | 30      |
|                         | Code Quality & Reusability          | 20      |
| Final Result – Go/No-Go | Justification Quality               | 40      |
|                         | Accuracy                            | 10      |
| Bonus Points            | Critical Bug / Plan / Collaboration | 30      |
| **TOTAL**               |                                     | **300** |

- In case of a tie, the team with the earliest submission timestamp wins

---

## Support

If the application crashes or fails to start, ask an organiser for assistance. Do not attempt to debug or modify the executable yourself.

Good luck, and happy bug hunting!

---

*QuickWallet Testathon — Confidential participant document. Do not distribute beyond registered participants.*
