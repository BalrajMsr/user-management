import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../../../components/UI/Alert';
import { describe, it, expect, vi } from 'vitest';

describe('Alert Component', () => {
  it('renders success alert with message', () => {
    render(<Alert type="success" message="Success message" />);

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('text-green-400');
  });

  it('renders error alert with message', () => {
    render(<Alert type="error" message="Error occurred" />);

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('text-red-400');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Alert type="error" message="Close me" onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button if onClose is not provided', () => {
    render(<Alert type="success" message="No close button" />);

    expect(screen.queryByRole('button')).toBeNull();
  });
});
