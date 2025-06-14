import { render, screen } from '@testing-library/react';
import UserCard from '../../../components/Users/UserCard';
import { describe, it, expect } from 'vitest';

const mockUser = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    avatar: '',
};

describe('UserCard', () => {
    it('renders user info', () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    });
});
