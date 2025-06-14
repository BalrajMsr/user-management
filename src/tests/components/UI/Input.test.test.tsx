import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/UI/Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input component', () => {
  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('displays error message and red border when error is provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-300');
  });

  it('passes other props like type and value', () => {
    render(<Input label="Email" type="email" value="test@example.com" readOnly />);
    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
    expect(input.value).toBe('test@example.com');
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Name" onChange={handleChange} />);
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
