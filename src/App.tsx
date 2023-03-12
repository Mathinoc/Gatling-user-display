import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UsersTable from './components/UserList';
import UserPosts from './components/UserPosts';
import AppBody from './components/AppBody';

const App = (): JSX.Element => (
  <div className="App">
    <BrowserRouter>
      <AppBody>
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/user-posts/:userId" element={<UserPosts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppBody>
    </BrowserRouter>
  </div>
);

export default App;
