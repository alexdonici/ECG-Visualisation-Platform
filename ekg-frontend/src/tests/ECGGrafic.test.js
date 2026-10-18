import { render, screen } from '@testing-library/react';
import EKGChart from './EKGChart';

test('renders EKG chart title', () => {
  render(<EKGChart />);
  const titleElement = screen.getByText(/EKG Chart/i);
  expect(titleElement).toBeInTheDocument();
});
