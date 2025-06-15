import { vi, describe, it, expect, beforeEach } from 'vitest';
import { apiService } from '../../services/api';
import type { LoginCredentials, CreateUserData, UpdateUserData } from '../../types';

const mockFetch = vi.fn();

(globalThis as any).fetch = mockFetch;

describe('ApiService', () => {
    const mockHeaders = {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
    };

    beforeEach(() => {
        mockFetch.mockReset();
    });

    it('should login successfully', async () => {
        const credentials: LoginCredentials = { email: 'test@example.com', password: '1234' };
        const token = 'fake-token';

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ token }),
        });

        const result = await apiService.login(credentials);

        expect(fetch).toHaveBeenCalledWith(
            'https://reqres.in/api/login',
            expect.objectContaining({
                method: 'POST',
                headers: mockHeaders,
                body: JSON.stringify(credentials),
            })
        );
        expect(result.token).toBe(token);
    });

    it('should throw error on login failure', async () => {
        const credentials: LoginCredentials = { email: 'test@example.com', password: 'wrong' };
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ error: 'Invalid credentials' }),
        });

        await expect(apiService.login(credentials)).rejects.toThrow('Invalid credentials');
    });

    it('should fetch users for given page', async () => {
        const data = { data: [], page: 1 };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(data),
        });

        const result = await apiService.getUsers(1);

        expect(fetch).toHaveBeenCalledWith(
            'https://reqres.in/api/users?page=1&per_page=6',
            expect.objectContaining({ headers: mockHeaders })
        );
        expect(result).toEqual(data);
    });

    it('should create a user successfully', async () => {
        const newUser: CreateUserData = { first_name: 'John', last_name: 'Doe', email: 'john@example.com' };
        const response = { id: 101, ...newUser };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(response),
        });

        const result = await apiService.createUser(newUser);

        expect(fetch).toHaveBeenCalledWith(
            'https://reqres.in/api/users',
            expect.objectContaining({
                method: 'POST',
                headers: mockHeaders,
                body: JSON.stringify(newUser),
            })
        );
        expect(result).toEqual(response);
    });

    it('should update a user successfully', async () => {
        const updatedUser: UpdateUserData = { id: 5, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(updatedUser),
        });

        const result = await apiService.updateUser(updatedUser);

        expect(fetch).toHaveBeenCalledWith(
            'https://reqres.in/api/users/5',
            expect.objectContaining({
                method: 'PUT',
                headers: mockHeaders,
                body: JSON.stringify(updatedUser),
            })
        );
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user successfully', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
        });

        const result = await apiService.deleteUser(7);

        expect(fetch).toHaveBeenCalledWith(
            'https://reqres.in/api/users/7',
            expect.objectContaining({
                method: 'DELETE',
                headers: mockHeaders,
            })
        );
        expect(result).toEqual({ success: true });
    });

    it('should throw on failed delete', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(apiService.deleteUser(99)).rejects.toThrow('Failed to delete user');
    });
});
