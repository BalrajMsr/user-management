import { render, screen, fireEvent } from '@testing-library/react';
import UsersTable from '../../../components/Users/UsersTable';
import { User } from '../../../types';
import { describe, it, vi, beforeEach, expect } from 'vitest';

describe('UsersTable', () => {
    const mockUsers: User[] = [
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            avatar: 'https://example.com/avatar1.jpg',
        },
        {
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            avatar: 'https://example.com/avatar2.jpg',
        },
    ];

    const onEditMock = vi.fn();
    const onDeleteMock = vi.fn();

    beforeEach(() => {
        onEditMock.mockClear();
        onDeleteMock.mockClear();
    });

    it('renders all user data in table rows', () => {
        render(<UsersTable users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);

        // Check emails
        mockUsers.forEach((user) => {
            expect(screen.getByText(user.email)).toBeInTheDocument();
        });

        // Check names
        mockUsers.forEach((user) => {
            expect(screen.getByText(user.first_name)).toBeInTheDocument();
            expect(screen.getByText(user.last_name)).toBeInTheDocument();
        });

        // Check avatars by alt text
        mockUsers.forEach((user) => {
            expect(
                screen.getByAltText(`${user.first_name} ${user.last_name}`)
            ).toBeInTheDocument();
        });
    });

    it('calls onEdit when Edit button is clicked', () => {
        render(<UsersTable users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
        expect(onEditMock).toHaveBeenCalledWith(mockUsers[0]);
    });

    it('calls onDelete when Delete button is clicked', () => {
        render(<UsersTable users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[1]);
        expect(onDeleteMock).toHaveBeenCalledWith(mockUsers[1]);
    });
});
