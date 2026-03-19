import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { randomUser } from '../../utils/testData';

test.describe('Profile API - invalid empty POST requests', () => {
  async function createAndLoginUser(request: any) {
    const api = new ApiClient(request);
    const user = randomUser();

    const registerRes = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );
    expect(registerRes.ok()).toBeTruthy();

    const loginRes = await api.login(user.username, user.password);
    expect(loginRes.ok()).toBeTruthy();
  }

  async function postEmptyForm(request: any, url: string) {
    return request.post(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {},
    });
  }

  test('change password without body should not crash server', async ({ request }) => {
    await createAndLoginUser(request);

    const res = await postEmptyForm(request, '/profile/change-password');

    console.log('change-password status:', res.status());
    console.log('change-password body:', await res.text());

    expect(res.status()).not.toBe(500);
  });

  test('change daily limit without body should not crash server', async ({ request }) => {
    await createAndLoginUser(request);

    const res = await postEmptyForm(request, '/profile/change-daily-limit');

    console.log('change-daily-limit status:', res.status());
    console.log('change-daily-limit body:', await res.text());

    expect(res.status()).not.toBe(500);
  });

  test('change monthly limit without body should not crash server', async ({ request }) => {
    await createAndLoginUser(request);

    const res = await postEmptyForm(request, '/profile/change-monthly-limit');

    console.log('change-monthly-limit status:', res.status());
    console.log('change-monthly-limit body:', await res.text());

    expect(res.status()).not.toBe(500);
  });

  test('reset daily limit without body should not crash server', async ({ request }) => {
    await createAndLoginUser(request);

    const res = await postEmptyForm(request, '/profile/reset-daily-limit');

    console.log('reset-daily-limit status:', res.status());
    console.log('reset-daily-limit body:', await res.text());

    expect(res.status()).not.toBe(500);
  });

  test('reset monthly limit without body should not crash server', async ({ request }) => {
    await createAndLoginUser(request);

    const res = await postEmptyForm(request, '/profile/reset-monthly-limit');

    console.log('reset-monthly-limit status:', res.status());
    console.log('reset-monthly-limit body:', await res.text());

    expect(res.status()).not.toBe(500);
  });
});