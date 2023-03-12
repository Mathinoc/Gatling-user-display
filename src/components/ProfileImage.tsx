import React from 'react';
import '../styles/ProfileImage.css';

export const ProfileImage = ({ username }: { username: string }): JSX.Element => {
  return (
    <div className="ProfileImage">
      <p>{username[0]}</p>
    </div>
  );
};

export default ProfileImage;
