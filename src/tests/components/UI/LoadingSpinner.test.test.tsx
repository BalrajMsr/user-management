import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { describe, it, expect } from 'vitest';

describe('LoadingSpinner component', () => {
  it('renders the spinner with correct size class', () => {
    render(<LoadingSpinner size="md" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8 w-8');
  });
});
