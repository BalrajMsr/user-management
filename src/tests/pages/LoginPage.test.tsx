import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../../src/pages/LoginPage';
import { describe, it, expect } from 'vitest';

describe('LoginPage', () => {
    it('renders login form inputs', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
});
