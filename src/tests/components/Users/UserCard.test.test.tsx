import { render } from '@testing-library/react';
import UserCard from '../../../components/Users/UserCard';
import { describe, it, expect } from 'vitest';

describe('UserCard', () => {
  it('renders without crashing', () => {
    render(<UserCard user={id: 1, first_name: "John", last_name: "Doe", email: "", avatar: ""} />);
    expect(true).toBeTruthy(); // Replace with real checks
  });
});