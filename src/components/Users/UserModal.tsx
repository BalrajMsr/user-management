import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { useAppDispatch } from '../../hooks/hooks';
import { createUser, updateUser, closeModal } from '../../store/slices/usersSlice';
import type { User } from '../../types';

interface UserModalProps {
    isOpen: boolean;
    user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, user }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (user) {
                form.setFieldsValue({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                });
            } else {
                form.resetFields();
            }
        }
    }, [user, isOpen, form]);

    const handleSubmit = async (values: {
        first_name: string;
        last_name: string;
        email: string;
        avatar?: string;
    }) => {
        setLoading(true);

        try {
            if (user) {
                await dispatch(updateUser({ ...values, id: user.id })).unwrap();
            } else {
                await dispatch(createUser(values)).unwrap();
            }
        } catch (error) {
            console.error('Failed to save user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        dispatch(closeModal());
        form.resetFields();
    };

    return (
        <Modal
            title={user ? 'Edit User' : 'Create New User'}
            open={isOpen}
            onCancel={handleClose}
            footer={null}
            destroyOnClose
            className="user-modal"
            width={500}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name!' }]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter last name!' }]}
                >
                    <Input placeholder="Please enter last name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Please enter email" />
                </Form.Item>

                <Form.Item
                    name="avatar"
                    label="Profile Image Link"
                    rules={[{ required: true, message: 'Please enter profile image link!' }]}
                >
                    <Input placeholder="Please enter profile image link" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} size="large">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading} size="large">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
