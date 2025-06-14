import { render } from '@testing-library/react';
import UsersTable from '../../../components/Users/UsersTable';
import { describe, it, expect } from 'vitest';

describe('UsersTable', () => {
  it('renders without crashing', () => {
    render(<UsersTable user={id: 1, first_name: "John", last_name: "Doe", email: "", avatar: ""} />);
    expect(true).toBeTruthy(); // Replace with real checks
  });
});