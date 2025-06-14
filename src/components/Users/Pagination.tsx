import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentPage, fetchUsers } from '../../store/slices/usersSlice';

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages } = useAppSelector((state) => state.users);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        dispatch(fetchUsers(page));
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <AntPagination
                current={currentPage}
                total={totalPages * 6}
                pageSize={6}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper={false}
            />
        </div>
    );
};

export default Pagination;
