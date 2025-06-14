import React from 'react';
import { Table, Space } from 'antd';
import { User } from '../../types';

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 60,
            render: (avatar: string, record: User) => (
                <img
                    src={avatar}
                    alt={`${record.first_name} ${record.last_name}`}
                    className="user-avatar-table"
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => (
                <a href={`mailto:${email}`} className="user-email-link">
                    {email}
                </a>
            ),
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_: any, record: User) => (
                <Space>
                    <button className="action-btn edit-btn" onClick={() => onEdit(record)}>
                        Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(record)}>
                        Delete
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={false}
            className="users-table"
        />
    );
};

export default UsersTable;
