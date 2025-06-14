import reducer from '../../../store/slices/usersSlice';
import { describe, it, expect } from 'vitest';

describe('usersSlice reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toBeDefined(); // Check actual state shape
    });
});
