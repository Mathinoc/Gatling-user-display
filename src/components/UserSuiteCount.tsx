import React from 'react';
import suiteCount from '../helper/suiteCount';
import { type User } from '../interfaces/User';

const UserSuiteCount = ({ users }: { users: User[] }): JSX.Element => {
  const userHousing = suiteCount(users);

  return (
    <p>
      {userHousing.app} user{userHousing.app > 1 && 's'} living in apartment{userHousing.suite > 1 && 's'} and {userHousing.suite} user{userHousing.app > 1 && 's'} living in suite{userHousing.suite > 1 && 's'}.
    </p>
  );
};

export default UserSuiteCount;
