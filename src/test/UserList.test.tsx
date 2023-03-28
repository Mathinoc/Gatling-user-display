import React from 'react';
import UserList from '../components/UserList';
import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usersResponse } from './mock';
import { getUsers } from '../UserApiClient';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const queryClient = new QueryClient();

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
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <UserList />
        </Router>
      </QueryClientProvider>
    );
    await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 3000 });

    await waitFor(() => {
      expect(getUsers).toBeCalledTimes(1);
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('1 user living in apartment and 1 user living in suite.')).toBeInTheDocument();
    });
  });

  it('renders all candidates', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <UserList />
        </Router>
      </QueryClientProvider>
    );
    // No need to await for spinner because the data appears immidiately (cached with useQuery)
    // await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 2000 });

    await waitFor(() => {
      expect(container.getElementsByClassName('UserCard').length).toBe(2);
    });
  });

  it('routes to a new path when users are clicked on', async () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <UserList />
        </Router>
      </QueryClientProvider>
    );
    // No need to await for spinner because the data appears immidiately (cached with useQuery)
    // await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading Spinner/i), { timeout: 2000 });

    const userCard = screen.getByText('Leanne Graham');
    await user.click(userCard);
    expect(history.push).toHaveBeenCalledWith({
      hash: '',
      pathname: '/users/1/posts',
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
