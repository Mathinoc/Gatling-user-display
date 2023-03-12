import { type User } from '../interfaces/User';

interface SuiteCount {
  suite: number
  app: number
}

const suiteCount = (users: User[]): SuiteCount => {
  return extractAccommodationType(users).reduce((acc, cur) => {
    if (cur === 'suite') acc.suite++;
    if (cur === 'apt.') acc.app++;
    return acc;
  }, { suite: 0, app: 0 });
};

const extractAccommodationType = (users: User[]): string[] => {
  return users.map(user => user.address.suite.split(' ')[0].toLowerCase());
};

export default suiteCount;
