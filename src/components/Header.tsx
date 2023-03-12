import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import blogIcon from '../assets/bloglogo.png';

const Header = (): JSX.Element => {
  return (
    <div className="Header">
      <Link to="/" className="Header__homelink">
        <img src={blogIcon} />
      </Link>
    </div>
  );
};

export default Header;
