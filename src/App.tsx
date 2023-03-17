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
          <Route path="/users" element={<UsersTable />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </AppBody>
    </BrowserRouter>
  </div>
);

export default App;
