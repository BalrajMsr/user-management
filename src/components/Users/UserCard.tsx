import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../types';

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UserCardGrid: React.FC<Props> = ({ users, onEdit, onDelete }) => (
    <div className="user-cards-grid">
        {users.map((user) => (
            <div key={user.id} className="user-card">
                <div className='user-card-info'>
                    <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="user-card-avatar"
                    />
                    <div className="user-card-name">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="user-card-email">{user.email}</div>
                </div>
                <div className="user-card-hover-actions">
                    <button
                        aria-label={`Edit ${user.first_name} ${user.last_name}`}
                        className="floating-action-btn floating-edit-btn"
                        onClick={() => onEdit(user)}
                    >
                        <EditOutlined />
                    </button>
                    <button
                        aria-label={`Delete ${user.first_name} ${user.last_name}`}
                        className="floating-action-btn floating-delete-btn"
                        onClick={() => onDelete(user)}
                    >
                        <DeleteOutlined />
                    </button>

                </div>
            </div>
        ))}
    </div>
);

export default UserCardGrid;
