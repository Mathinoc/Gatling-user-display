import React from 'react';
import '../styles/AppBody.css';
import Header from './Header';

const AppBody = ({ children }: AppBodyProps): JSX.Element => {
  return (
    <div className="AppBody">
      <Header />
      <div className="AppBody__core">
        {children}
      </div>
    </div>
  );
};

export default AppBody;

interface AppBodyProps {
  children: JSX.Element
};
