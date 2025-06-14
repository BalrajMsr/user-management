import { render } from '@testing-library/react';
import Pagination from '../../../components/Users/Pagination';
import { describe, it, expect } from 'vitest';

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination user={id: 1, first_name: "John", last_name: "Doe", email: "", avatar: ""} />);
    expect(true).toBeTruthy(); // Replace with real checks
  });
});