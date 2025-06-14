import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { describe, it, expect } from 'vitest';

describe('LoadingSpinner', () => {
    it('renders correctly', () => {
        render(<LoadingSpinner />);
        expect(screen.getByText('LoadingSpinner')).toBeDefined(); // Customize this check
    });
});
