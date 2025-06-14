export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
    viewMode: 'list' | 'card';
    isModalOpen: boolean;
    editingUser: User | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
}

export interface UpdateUserData extends CreateUserData {
    id: number;
}
