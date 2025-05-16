import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  test('check component render', () => {
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

  test('login with empty login and password', async () => {
    renderWithRouter();

    const loginButton = screen.getByRole('button', { type: 'submit', name: /LOGIN/i });
    fireEvent.click(loginButton);
    const textError = await screen.findAllByTestId(/error-text/i);
    expect(textError).toHaveLength(2);
  });

  test('login with < 5 symbols and password < 6 symbols', async () => {
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

  test('btn block after blur empty field', async () => {
    renderWithRouter();

    const loginInput = screen.getByLabelText(/login/i);
    await userEvent.click(loginInput);
    await userEvent.tab();

    await waitFor(() => expect(
      screen.getByRole('button', { name: /^login$/i }),
    ).toBeDisabled());
  });

  test('show error after blur empty field', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByLabelText(/login/i));
    await userEvent.tab();
    expect(await screen.findByTestId('error-text')).toBeVisible();
  });

  test('dispatch(loginUser) call to correct values', async () => {
    renderWithRouter();

    await userEvent.type(screen.getByLabelText(/login/i), 'valid');
    await userEvent.type(screen.getByLabelText(/password/i), 'ValidPass');

    await userEvent.tab();

    const submitBtn = screen.getByRole('button', { name: /^login$/i });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    await userEvent.click(submitBtn);

    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
  });

  test('dispatch registrationGoogle', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test('redirect to main page after login', () => {
    useSelector.mockImplementation((sel) => sel({ auth: { isAuth: true } }));
    renderWithRouter();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
