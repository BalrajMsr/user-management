import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import * as hooks from '../../hooks/hooks'; // import as namespace
import { vi, describe, expect, it, beforeEach } from 'vitest';

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // reset any previous mocks
    });

    it('redirects to /login if not authenticated', () => {
        vi.spyOn(hooks, 'useAppSelector').mockImplementation(() => ({
            isAuthenticated: false,
        }));

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('renders children if authenticated', () => {
        vi.spyOn(hooks, 'useAppSelector').mockImplementation(() => ({
            isAuthenticated: true,
        }));

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
