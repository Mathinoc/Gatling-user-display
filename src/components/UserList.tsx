import React, { type FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../UserApiClient';
import '../styles/UserList.css';
import { type User } from '../interfaces/User';
import PropagateLoader from 'react-spinners/PropagateLoader';
import EmptyState from './EmptyState';
import UserCard from './UserCard';
import UserSuiteCount from './UserSuiteCount';

const UserList: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await getUsers();
      setUsers(response);
      setLoadingSuccess(true);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      loadUsers()
        .catch((e) => {
          console.log(e);
          setLoadingSuccess(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const userDisplay = users.map(user =>
    <Link
      key={user.id}
      to={`/user-posts/${user.id}`}
    >
      {<UserCard user={user} />}
    </Link>
  );

  return (
    <div className="UserList" data-testid="userList">
      {loading &&
        <div className="UserList__loader">
          <PropagateLoader loading={loading} aria-label="Loading Spinner" color={'#6161D6'} />
        </div>
      }

      {loadingSuccess &&
        <>
          <UserSuiteCount users={users} />
          {userDisplay}
        </>
      }

      {!loading && loadingSuccess && users.length === 0 && <EmptyState text="No users" />}
      {!loading && !loadingSuccess && <EmptyState text="Couldn't load users" />}
    </div>
  );
};

export default UserList;
