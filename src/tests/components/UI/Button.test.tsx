import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/UI/Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
    it('renders with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText(/click me/i)).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByText(/click/i));
        expect(handleClick).toHaveBeenCalled();
    });

    it('displays loading spinner when loading', () => {
        render(<Button loading>Submit</Button>);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
