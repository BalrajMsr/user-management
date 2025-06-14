import React from 'react';
import { Row, Col, Button, Input, Typography, Space } from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { openModal, setSearchTerm, setViewMode } from '../../store/slices/usersSlice';

const { Title } = Typography;

const SearchAndControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { viewMode, searchTerm } = useAppSelector((state) => state.users);

    return (
        <div className="controls-section">
            <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={12} md={14} lg={16}>
                    <Title className="page-title">Users</Title>
                    <div className="view-toggle-group">
                        <Button
                            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            icon={<UnorderedListOutlined />}
                            onClick={() => dispatch(setViewMode('list'))}
                        >
                            Table
                        </Button>
                        <Button
                            className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                            icon={<AppstoreOutlined />}
                            onClick={() => dispatch(setViewMode('card'))}
                        >
                            Card
                        </Button>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={10} lg={8}>
                    <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Input
                            placeholder="Input search text"
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            className="search-input"
                            allowClear
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => dispatch(openModal(null))}
                            className="create-user-btn"
                        >
                            Create User
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default SearchAndControls;
