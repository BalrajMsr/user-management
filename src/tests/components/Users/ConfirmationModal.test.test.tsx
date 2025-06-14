import { render } from '@testing-library/react';
import ConfirmationModal from '../../../components/Users/ConfirmationModal';
import { describe, it, expect } from 'vitest';

describe('ConfirmationModal', () => {
  it('renders without crashing', () => {
    render(<ConfirmationModal user={id: 1, first_name: "John", last_name: "Doe", email: "", avatar: ""} />);
    expect(true).toBeTruthy(); // Replace with real checks
  });
});