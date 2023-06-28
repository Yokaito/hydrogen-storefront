import {render, screen, waitFor} from '@testing-library/react';

import {Home} from '../routes/_index';
import '@testing-library/jest-dom';
import 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

describe('Home', () => {
  const fakeUsers = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Kevin'},
  ];

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders Home component with API success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeUsers), {
      status: 200,
    });

    render(<Home />);

    expect(screen.getByRole('heading')).toHaveTextContent('List of Users');

    expect(await screen.findByText('John Doe')).toBeInTheDocument();

    expect(screen.queryByText('No users found')).not.toBeInTheDocument();
  });

  test('renders Home component with API failure', async () => {
    fetchMock.mockReject(() => Promise.reject('API is down'));

    render(<Home />);

    expect(
      await screen.findByText('Something went wrong!'),
    ).toBeInTheDocument();
    expect(await screen.findByText('No users found')).toBeInTheDocument();
  });

  test('button remove user from list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeUsers), {
      status: 200,
    });

    render(<Home />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Kevin')).toBeInTheDocument();

    const buttonRemoveUser = await screen.findByTestId('remove-user-1');

    expect(buttonRemoveUser).toBeInTheDocument();

    await userEvent.click(buttonRemoveUser);

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  test('button to insert a new user in list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeUsers), {
      status: 200,
    });

    render(<Home />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    const inputName = await screen.findByTestId('input-name');

    expect(inputName).toBeInTheDocument();

    const buttonAddUser = await screen.findByTestId('add-user-button');

    expect(buttonAddUser).toBeInTheDocument();

    await userEvent.type(inputName, 'New User');
    await userEvent.click(buttonAddUser);

    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument();
    });
  });
});
