import { render } from '@testing-library/react';
import UserModal from '../../../components/Users/UserModal';
import { describe, it, expect } from 'vitest';

describe('UserModal', () => {
  it('renders without crashing', () => {
    render(<UserModal user={id: 1, first_name: "John", last_name: "Doe", email: "", avatar: ""} />);
    expect(true).toBeTruthy(); // Replace with real checks
  });
});