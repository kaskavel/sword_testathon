import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {
    return this.request.post('/auth/api/login', {
      form: {
        username,
        password,
      },
    });
  }

  async register(
    username: string,
    email: string,
    fullName: string,
    password: string
  ) {
    return this.request.post('/auth/api/register', {
      form: {
        username,
        email,
        full_name: fullName,
        password,
      },
    });
  }

  async createAccount(currency: string) {
    return this.request.post('/accounts/api/create', {
      form: {
        currency,
        initial_deposit: 0,
      },
    });
  }

  async listAccounts() {
    return this.request.get('/accounts/api/list');
  }

  async deposit(accountId: number, amount: number) {
    return this.request.post('/transactions/api/deposit', {
      form: {
        account_id: accountId,
        amount,
      },
    });
  }

  async withdraw(accountId: number, amount: number) {
    return this.request.post('/transactions/api/withdraw', {
      form: {
        account_id: accountId,
        amount,
      },
    });
  }

  async transfer(
    fromAccountId: number,
    toAccountNumber: string,
    amount: number
  ) {
    return this.request.post('/transactions/api/transfer', {
      form: {
        from_account_id: fromAccountId,
        to_account_number: toAccountNumber,
        amount,
      },
    });
  }

  async transactionHistory() {
    return this.request.get('/transactions/api/history');
  }
}