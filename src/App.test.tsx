import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /select a country:/i
  });
  const input = screen.getByRole('textbox')
  expect(heading).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  screen.debug()
});
