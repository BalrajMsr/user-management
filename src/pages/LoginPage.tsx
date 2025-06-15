import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space, Alert, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';
import type { CheckboxProps } from 'antd';


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


    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%', textAlign: 'left' }}
                >

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
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Enter your password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="remindme"
                        >
                            <Checkbox onChange={onChange}>Remember Me</Checkbox>

                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        </div>
    );
};

export default LoginPage;
