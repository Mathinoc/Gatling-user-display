import React from 'react';
import UserList from '../components/UserList';
import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usersResponse } from './mock';
import { getUsers } from '../UserApiClient';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
history.push = jest.fn();

jest.mock('../UserApiClient', () => ({
  getUsers: jest.fn()
}));

beforeEach(() => {
  (getUsers as jest.Mock).mockImplementation(() => (usersResponse));
});

describe('UserList', () => {
  it('loads and displays housing stats and a list of users', async () => {
    render(<Router location={history.location} navigator={history}><UserList /></Router>);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 2000 });

    await waitFor(() => {
      expect(getUsers).toBeCalledTimes(1);
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('1 user living in apartment and 1 user living in suite.')).toBeInTheDocument();
    });
  });

  it('renders all candidates', async () => {
    const { container } = render(<Router location={history.location} navigator={history}><UserList /></Router>);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 2000 });

    await waitFor(() => {
      expect(container.getElementsByClassName('UserCard').length).toBe(2);
    });
  });

  it('routes to a new path when users are clicked on', async () => {
    const user = userEvent.setup();
    render(<Router location={history.location} navigator={history}><UserList /></Router>);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 2000 });

    const userCard = screen.getByText('Leanne Graham');
    await user.click(userCard);
    expect(history.push).toHaveBeenCalledWith({
      hash: '',
      pathname: '/user-posts/1',
      search: ''
    },
    undefined,
    {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined
    }
    );
  });
});
