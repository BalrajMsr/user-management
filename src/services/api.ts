import type { LoginCredentials, CreateUserData, UpdateUserData } from '../types';

const API_BASE_URL = 'https://reqres.in/api';

class ApiService {
    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
        };
        return headers;
    }

    async login(credentials: LoginCredentials) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        return response.json();
    }

    async getUsers(page = 1) {
        const response = await fetch(`${API_BASE_URL}/users?page=${page}&per_page=6`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return response.json();
    }

    async createUser(userData: CreateUserData) {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        return response.json();
    }

    async updateUser(userData: UpdateUserData) {
        const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return response.json();
    }

    async deleteUser(id: number) {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        return { success: true };
    }
}

export const apiService = new ApiService();
