import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCardGrid from '../../../components/Users/UserCard';
import { User } from '../../../types';
import { describe, vi, beforeEach, it, expect } from 'vitest';

describe('UserCardGrid', () => {
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

    it('renders user cards correctly', () => {
        render(<UserCardGrid users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);

        mockUsers.forEach((user) => {
            expect(screen.getByText(`${user.first_name} ${user.last_name}`)).toBeInTheDocument();
            expect(screen.getByText(user.email)).toBeInTheDocument();
            expect(screen.getByAltText(`${user.first_name} ${user.last_name}`)).toBeInTheDocument();
        });
    });

    it('calls onEdit when edit button is clicked', () => {
        render(<UserCardGrid users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);

        const editButton = screen.getByRole('button', {
            name: `Edit ${mockUsers[0].first_name} ${mockUsers[0].last_name}`,
        });

        fireEvent.click(editButton);
        expect(onEditMock).toHaveBeenCalledWith(mockUsers[0]);
    });

    it('calls onDelete when delete button is clicked', () => {
        render(<UserCardGrid users={mockUsers} onEdit={onEditMock} onDelete={onDeleteMock} />);

        const deleteButton = screen.getByRole('button', {
            name: `Delete ${mockUsers[0].first_name} ${mockUsers[0].last_name}`,
        });

        fireEvent.click(deleteButton);
        expect(onDeleteMock).toHaveBeenCalledWith(mockUsers[0]);
    });
});
