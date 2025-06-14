import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import type { UsersState, CreateUserData, UpdateUserData } from '../../types';

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    viewMode: 'list',
    isModalOpen: false,
    editingUser: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await apiService.getUsers(page);
            return response;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to fetch users',
            );
        }
    },
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData: CreateUserData & { avatar?: string }, { rejectWithValue }) => {
        try {
            const response = await apiService.createUser(userData);
            return {
                ...response,
                id: Date.now(),
                avatar: userData.avatar || `https://i.pravatar.cc/150?u=${userData.email}`,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
            };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to create user',
            );
        }
    },
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (userData: UpdateUserData & { avatar?: string }, { rejectWithValue }) => {
        try {
            const response = await apiService.updateUser(userData);
            return { ...userData, ...response };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to update user',
            );
        }
    },
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number, { rejectWithValue }) => {
        try {
            await apiService.deleteUser(id);
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to delete user',
            );
        }
    },
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.editingUser = action.payload || null;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.editingUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.totalPages = action.payload.total_pages;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create User
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
                state.isModalOpen = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                state.isModalOpen = false;
                state.editingUser = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSearchTerm, setViewMode, setCurrentPage, openModal, closeModal, clearError } =
    usersSlice.actions;

export default usersSlice.reducer;
