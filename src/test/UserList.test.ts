import { type User } from '../interfaces/User';

describe('sample', () => {
  it('sample', () => {
    const user: User = {
      name: 'Name',
      id: 1,
      username: 'username',
      address: { suite: 'suite #' }
    };
    expect(user).toBe(user);
  });
});
