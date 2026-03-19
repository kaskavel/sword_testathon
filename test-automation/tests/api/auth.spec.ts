import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';

function randomUser() {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    username: `user-${unique}`,
    email: `user-${unique}@example.com`,
    fullName: `User ${unique}`,
    password: 'Pass1234',
  };
}

test.describe('Authentication API', () => {
  test('user can register successfully via API', async ({ request }) => {
    const api = new ApiClient(request);
    const user = randomUser();

    const response = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );

    expect(response.ok()).toBeTruthy();
  });

  test('user can login successfully via API after registration', async ({ request }) => {
    const api = new ApiClient(request);
    const user = randomUser();

    const registerResponse = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );
    expect(registerResponse.ok()).toBeTruthy();

    const loginResponse = await api.login(user.username, user.password);
    expect(loginResponse.ok()).toBeTruthy();
  });

  test('user cannot login with wrong password via API', async ({ request }) => {
    const api = new ApiClient(request);
    const user = randomUser();

    const registerResponse = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );
    expect(registerResponse.ok()).toBeTruthy();

    const loginResponse = await api.login(user.username, 'WrongPass123');
    expect(loginResponse.ok()).toBeFalsy();
  });

  test('duplicate API registration should be rejected', async ({ request }) => {
    const api = new ApiClient(request);
    const user = randomUser();

    const firstRegisterResponse = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );
    expect(firstRegisterResponse.ok()).toBeTruthy();

    const secondRegisterResponse = await api.register(
      user.username,
      user.email,
      user.fullName,
      user.password
    );
    expect(secondRegisterResponse.ok()).toBeFalsy();
  });
});

test('register should fail with missing email', async ({ request }) => {
  const api = new ApiClient(request);
  const user = randomUser();

  const res = await request.post('/auth/api/register', {
    form: {
      username: user.username,
      password: user.password,
      full_name: user.fullName,
      // missing email
    },
  });

  console.log('STATUS:', res.status());
  console.log('BODY:', await res.text());

  expect(res.ok()).toBeFalsy();
});