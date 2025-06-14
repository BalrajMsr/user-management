import React from 'react';
import { Modal, Space, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    loading = false,
}) => {
    return (
        <Modal
            title={
                <Space>
                    <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                    {title}
                </Space>
            }
            open={isOpen}
            onCancel={onClose}
            onOk={onConfirm}
            okText="Delete"
            okType="danger"
            confirmLoading={loading}
            cancelText="Cancel"
        >
            <Text>{message}</Text>
        </Modal>
    );
};

export default ConfirmationModal;
