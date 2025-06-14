import usersReducer, { setCurrentPage } from '../../../src/store/slices/usersSlice';

describe('usersSlice', () => {
    it('should return initial state', () => {
        const initialState = usersReducer(undefined, { type: '' });
        expect(initialState.users).toEqual([]);
        expect(initialState.loading).toBe(false);
    });

    it('should update current page', () => {
        const state = usersReducer(undefined, setCurrentPage(3));
        expect(state.currentPage).toBe(3);
    });
});
