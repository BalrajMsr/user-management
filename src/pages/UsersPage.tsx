import React, { useEffect, useState, useMemo } from 'react';
import { Space, Spin, Alert, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUsers, deleteUser, openModal, clearError } from '../store/slices/usersSlice';
import type { User } from '../types';
import Layout from '../components/Layout/Layout';
import UserModal from '../components/Users/UserModal';
import ConfirmationModal from '../components/Users/ConfirmationModal';
import Pagination from '../components/Users/Pagination';

import SearchAndControls from '../components/Users/SearchAndControls';
import UserCardGrid from '../components/Users/UserCard';
import UsersTable from '../components/Users/UsersTable';

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error, currentPage, searchTerm, viewMode, isModalOpen, editingUser } =
        useAppSelector((state) => state.users);

    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        user: User | null;
        loading: boolean;
    }>({
        isOpen: false,
        user: null,
        loading: false,
    });

    useEffect(() => {
        dispatch(fetchUsers(currentPage));
    }, [dispatch, currentPage]);

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [users, searchTerm]);

    const handleEditUser = (user: User) => {
        dispatch(openModal(user));
    };

    const handleDeleteUser = (user: User) => {
        setDeleteConfirmation({
            isOpen: true,
            user,
            loading: false,
        });
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.user) return;
        setDeleteConfirmation((prev) => ({ ...prev, loading: true }));

        try {
            await dispatch(deleteUser(deleteConfirmation.user.id)).unwrap();
            setDeleteConfirmation({
                isOpen: false,
                user: null,
                loading: false,
            });
        } catch (error) {
            console.error('Failed to delete user:', error);
            setDeleteConfirmation((prev) => ({ ...prev, loading: false }));
        }
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
            isOpen: false,
            user: null,
            loading: false,
        });
    };

    return (
        <Layout>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => dispatch(clearError())}
                    />
                )}

                <SearchAndControls />

                <Spin spinning={loading} size="large">
                    {filteredUsers.length === 0 ? (
                        <Empty
                            description={
                                searchTerm
                                    ? 'No users found matching your search.'
                                    : 'No users found.'
                            }
                            style={{ padding: '60px 0' }}
                        />
                    ) : (
                        <>
                            {viewMode === 'list' ? (
                                <UsersTable
                                    users={filteredUsers}
                                    onEdit={handleEditUser}
                                    onDelete={handleDeleteUser}
                                />
                            ) : (
                                <UserCardGrid
                                    users={filteredUsers}
                                    onEdit={handleEditUser}
                                    onDelete={handleDeleteUser}
                                />
                            )}
                            {!searchTerm && <Pagination />}
                        </>
                    )}
                </Spin>
            </Space>

            <UserModal isOpen={isModalOpen} user={editingUser} />

            <ConfirmationModal
                isOpen={deleteConfirmation.isOpen}
                onClose={closeDeleteConfirmation}
                onConfirm={confirmDelete}
                loading={deleteConfirmation.loading}
                title="Delete User"
                message={
                    deleteConfirmation.user
                        ? `Are you sure you want to delete ${deleteConfirmation.user.first_name} ${deleteConfirmation.user.last_name}? This action cannot be undone.`
                        : ''
                }
            />
        </Layout>
    );
};

export default UsersPage;
