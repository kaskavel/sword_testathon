export function randomUser() {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    username: `user-${unique}`,
    email: `user-${unique}@example.com`,
    fullName: `User ${unique}`,
    password: 'Pass1234',
  };
}