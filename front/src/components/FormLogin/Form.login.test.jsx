import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormLogin from './FormLogin';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

const renderWithRouter = () => render(
  <BrowserRouter>
    <FormLogin />
  </BrowserRouter>,
);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockImplementation((sel) => sel({ auth: { isAuth: false } }));
});

describe('FormLogin__component', () => {
  test('render, default, should show login form with all fields and buttons', () => {
    renderWithRouter();

    const login = screen.getByRole('heading', { name: /LOGIN/i });
    const loginButton = screen.getByRole('button', { type: 'submit', name: /LOGIN/i });
    const googleButton = screen.getByRole('button', { name: /GOOGLE/i });
    const inputLogin = screen.getByRole('textbox', { type: 'text', name: /login/i });
    const inputPassword = screen.getByRole('textbox', { type: 'password' });

    expect(login).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputLogin).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  test('submit, empty login and password, should show 2 validation errors', async () => {
    renderWithRouter();

    const loginButton = screen.getByRole('button', { type: 'submit', name: /LOGIN/i });
    fireEvent.click(loginButton);
    const textError = await screen.findAllByTestId(/error-text/i);
    expect(textError).toHaveLength(2);
  });

  test('submit, login < 5 chars & password < 6 chars → should show 2 validation errors', async () => {
    renderWithRouter();

    const inputLogin = screen.getByRole('textbox', { type: 'text', name: /login/i });
    const inputPassword = screen.getByRole('textbox', { type: 'password' });
    const loginButton = screen.getByRole('button', { type: 'submit', name: /LOGIN/i });
    fireEvent.input(inputLogin, { target: { value: 'test' } });
    fireEvent.input(inputPassword, { target: { value: 'test' } });
    fireEvent.click(loginButton);
    const textError = await screen.findAllByTestId(/error-text/i);
    expect(textError).toHaveLength(2);
  });

  test('blur login, empty value → should disable submit button', async () => {
    renderWithRouter();

    const loginInput = screen.getByLabelText(/login/i);
    await userEvent.click(loginInput);
    await userEvent.tab();

    await waitFor(() => expect(
      screen.getByRole('button', { name: /^login$/i }),
    ).toBeDisabled());
  });

  test('blur login, empty value, should show validation error message', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByLabelText(/login/i));
    await userEvent.tab();
    expect(await screen.findByTestId('error-text')).toBeVisible();
  });

  test('submit, valid credentials, should dispatch loginUser once', async () => {
    renderWithRouter();

    await userEvent.type(screen.getByLabelText(/login/i), 'valid');
    await userEvent.type(screen.getByLabelText(/password/i), 'ValidPass');

    await userEvent.tab();

    const submitBtn = screen.getByRole('button', { name: /^login$/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    await userEvent.click(submitBtn);

    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
  });

  test('click Google button, should dispatch registrationGoogle once', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test('isAuth true, should navigate to "/"', () => {
    useSelector.mockImplementation((sel) => sel({ auth: { isAuth: true } }));
    renderWithRouter();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
