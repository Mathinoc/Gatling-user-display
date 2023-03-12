import React from 'react';
import { type User } from '../interfaces/User';
import '../styles/UserCard.css';
import ProfileImage from './ProfileImage';

export const UserCard = ({ user }: { user: User }): JSX.Element => {
  return (
    <div className="UserCard">
      {<ProfileImage username={user.username} />}
      <p>
        {user.name} <span style={{ fontStyle: 'italic' }}>aka {user.username}</span>
      </p>
    </div>
  );
};

export default UserCard;
