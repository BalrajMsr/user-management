import React from 'react';
import { Layout as AntLayout } from 'antd';
import Navbar from './Navbar';

const { Content } = AntLayout;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AntLayout>
            <Navbar />
            <Content>
                <div className="main-content">{children}</div>
            </Content>
        </AntLayout>
    );
};

export default Layout;
