import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout } from '../../store/slices/authSlice';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!isAuthenticated) return null;

    return (
        <Header className="main-header">
            <div className="header-title">User Management System</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="header-user">Elon Musk</div>
                <Button className="header-logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default Navbar;
