import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/UI/Modal';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Modal component', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onClose} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Close Test">
        Content
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Backdrop Test">
        Content
      </Modal>
    );

    const backdrop = screen.getByText('', { selector: '.bg-opacity-50' });
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Escape Test">
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});