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

### Accessing the Application

Each team has its own dedicated container with an isolated database running on a shared server. Access your instance using the URL below, replacing the port with the one assigned to your team:

| Team             | URL                                                      |
|------------------|----------------------------------------------------------|
| Organizing Committee | http://azeuwathdevtestathonvm.azeuwdevath.lan:8000   |
| Team 1           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8001       |
| Team 2           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8002       |
| Team 3           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8003       |
| Team 4           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8004       |
| Team 5           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8005       |
| Team 6           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8006       |
| Team 7           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8007       |
| Team 8           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8008       |
| Team 9           | http://azeuwathdevtestathonvm.azeuwdevath.lan:8009       |
| Team 10          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8010       |
| Team 11          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8011       |
| Team 12          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8012       |
| Team 13          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8013       |
| Team 14          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8014       |
| Team 15          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8015       |
| Team 16          | http://azeuwathdevtestathonvm.azeuwdevath.lan:8016       |

Once on your team's URL, the available interfaces are:

| Interface          | Path             |
|--------------------|------------------|
| Web UI             | /                |
| Admin Panel        | /admin           |
| API Docs (Swagger) | /docs            |
| API Docs (ReDoc)   | /redoc           |
| API Info           | /api             |
| User Login         | /auth/login      |

> If you experience any connectivity issues, contact the organizing committee immediately.

### Running Locally (VPN fallback only)

If you have a VPN issue and cannot reach the shared server, you can run the application locally using the executable provided in this repository.

1. Download `quickwallet.exe` from this repo
2. Place it in a folder of your choice
3. Run it from PowerShell:
   ```powershell
   .\quickwallet.exe
   ```
4. The application will start and create a `quickwallet.db` file in the same folder
5. Access it at `http://localhost:8000`

> This option is a fallback only. Always prefer the shared server instance during the testathon.

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

### Part 1 — Test Planning

Before diving into bug hunting, each team will produce a structured test plan for the QuickWallet application.

#### Test Plan Requirements
- Identify the key functional areas to test
- Define test cases (positive and negative)
- Prioritise by risk
- State what tools and approaches you would use

#### How to Submit Your Test Plan

1. Go to the **Issues** tab of this repository and click **New Issue**
2. Select the **Test Plan** template
3. Attach your test plan document (any format accepted — PDF, Word, Excel, etc.)
4. Add the label matching your team (e.g. `team-1`, `team-2`, etc.)
5. Submit before the phase ends

---

### Part 2 — Bug Discovery & Automation

Your goal is to find as many bugs as possible and automate at least one test case.

#### How to Report a Bug

Open a separate issue for each bug found:

1. Go to the **Issues** tab of this repository and click **New Issue**
2. Select the **Bug Report** template
3. Fill in all required fields carefully — quality of reporting is scored
4. Add the label matching your team (e.g. `team-1`, `team-2`, etc.)
5. Submit the issue

A valid bug report must include:

1. **Title** — short description of the bug
2. **Severity** — Low / Medium / High (your assessment)
3. **Steps to Reproduce** — clear, numbered steps that reliably reproduce the issue
4. **Expected Result** — what should have happened
5. **Actual Result** — what actually happened
6. **Evidence** — screenshot, API response, or video where applicable

> Duplicate reports (same bug found by multiple teams) are awarded to the team that submitted first. Partial credit may be given for incomplete but valid reports.

#### Automation Requirements
- Automate at least one test case
- Scripts must be runnable and produce clear pass/fail output
- Any language or framework is accepted (Python, JavaScript, Postman collections, etc.)
- AI assistance is allowed — but you must understand and be able to explain your code
- Commit your code to this repo and push to a branch named after your team (e.g. `team-1`)

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

| Category              | Criteria                             | Max Points |
|-----------------------|--------------------------------------|------------|
| Bugs Found            | Low Severity                         | 40         |
|                       | Medium Severity                      | 50         |
|                       | High Severity                        | 60         |
| Bug Reporting Quality | Clarity & Reproducibility            | 50         |
| Test Strategy Plan    | Structure & Coverage                 | 60         |
|                       | Creativity & Prioritization          | 10         |
| Presentation          | Presentation of testing approach     | 50         |
| Automation Suite      | Automation test                      | 30         |
| Bonus Points          | Extra bug / Creativity / Out-of-box thinking | 50   |
| **TOTAL**             |                                      | **400**    |

- In case of a tie, the team with the earliest submission timestamp wins

---

## Support

If the application crashes or fails to start, ask an organiser for assistance. Do not attempt to debug or modify the executable yourself.

Good luck, and happy bug hunting!

---

*QuickWallet Testathon — Confidential participant document. Do not distribute beyond registered participants.*
