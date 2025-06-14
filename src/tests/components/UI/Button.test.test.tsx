import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/UI/Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('applies correct variant and size classes', () => {
    render(<Button variant="danger" size="lg">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('px-6 py-3 text-base');
  });

  it('shows loading spinner and disables the button when loading', () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument(); // Assuming LoadingSpinner renders an <svg>
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
