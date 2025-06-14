import reducer from '../../../store/slices/authSlice';
import { describe, it, expect } from 'vitest';

describe('authSlice reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toBeDefined(); // Check actual state shape
    });
});
