import React, { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../UserApiClient';
import { useQuery } from '@tanstack/react-query';
import '../styles/UserList.css';
import { type User } from '../interfaces/User';
import PropagateLoader from 'react-spinners/PropagateLoader';
import EmptyState from './EmptyState';
import UserCard from './UserCard';
import UserSuiteCount from './UserSuiteCount';

const UserList: FunctionComponent = () => {
  const {
    isLoading,
    isSuccess,
    data: users = [] as User[]
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="UserList__loader">
        <PropagateLoader loading aria-label="Loading Spinner" color={'#6161D6'} />
      </div>
    );
  }

  const userDisplay = users.map(user => // returns [] if userQuery.data is null
    <Link
      key={user.id}
      to={`/users/${user.id}/posts`}
    >
      {<UserCard user={user} />}
    </Link>
  );

  return (
    <div className="UserList" data-testid="userList">

      {!isLoading && isSuccess &&
        <>
          <UserSuiteCount users={users} />
          {userDisplay}
        </>
      }

      {!isLoading && isSuccess && users.length === 0 && <EmptyState text="No users" />}

      {!isLoading && !isSuccess && <EmptyState text="Couldn't load users" />}
    </div>
  );
};

export default UserList;
