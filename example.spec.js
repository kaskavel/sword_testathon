import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {

  test('valid login', async ({ request }) => {
    const res = await request.post('/auth/login', {
      form: {
        username: 'npaterakis',
        password: '12341234'
      }
    });

    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toBeTruthy();
  });

  test('invalid password', async ({ request }) => {
    const res = await request.post('/auth/login', {
      data: {   
        username: 'npaterakis',
        password: 'wrong'
      }
    });

    expect(res.status()).not.toBe(200);
  });

  test('empty password', async ({ request }) => {
    const res = await request.post('/auth/login', {
      form: {   
        username: 'user1',
        password: ''
      }
    });

    expect(res.status()).not.toBe(200);
  });

});