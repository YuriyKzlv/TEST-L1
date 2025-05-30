import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import withAuthentication from './withAuthentication';

const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: (...args) => mockUseSelector(...args),
}));

function Private() {
  return <h1>Private zone</h1>;
}
const Protected = withAuthentication(Private);

const renderWithRouter = (ui, { route = '/secret' } = {}) => render(
  <MemoryRouter initialEntries={[route]}>
    <Routes>
      <Route path="/secret" element={ui} />
      <Route path="/login" element={<h1>Login page</h1>} />
    </Routes>
  </MemoryRouter>,
);

describe('withAuthentication__HOC', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('authorized user, should render protected component', () => {
    mockUseSelector.mockReturnValue(true);

    renderWithRouter(<Protected />);

    expect(screen.getByRole('heading', { name: /private zone/i })).toBeTruthy();
  });

  test('unauthorized user, should redirect to /login', () => {
    mockUseSelector.mockReturnValue(false);
    renderWithRouter(<Protected />);

    expect(screen.queryByRole('heading', { name: /private zone/i })).not.toBeTruthy();
    expect(screen.getByRole('heading', { name: /login page/i })).toBeTruthy();
  });
});
