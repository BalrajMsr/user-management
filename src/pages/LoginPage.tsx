import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Space, Alert, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/users');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = async (values: { email: string; password: string }) => {
        dispatch(loginUser(values));
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    <Space direction="vertical" size="small">
                        <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                        <Title level={2} style={{ margin: 0 }}>
                            User Management System
                        </Title>
                        <Text type="secondary">Sign in to manage your users</Text>
                    </Space>

                    {error && (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            closable
                            onClose={() => dispatch(clearError())}
                        />
                    )}

                    <Form
                        form={form}
                        name="login"
                        onFinish={handleSubmit}
                        layout="vertical"
                        size="large"
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                    >
                        <Form.Item
                            name="email"
                            label="Email Address"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Enter your password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>

                    <Card size="small" style={{ backgroundColor: '#f6f6f6' }}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Text strong>Demo Credentials:</Text>
                            <Text>Email: eve.holt@reqres.in</Text>
                            <Text>Password: cityslicka</Text>
                        </Space>
                    </Card>
                </Space>
            </div>
        </div>
    );
};

export default LoginPage;
