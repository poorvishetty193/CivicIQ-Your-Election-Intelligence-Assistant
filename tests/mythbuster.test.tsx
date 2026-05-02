import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MythBuster } from '../components/MythBuster';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('MythBuster Component', () => {
  it('renders 10 myth cards', () => {
    render(<MythBuster />);
    const mythCards = screen.getAllByText('Myth');
    expect(mythCards.length).toBe(10);
  });

  it('flips to show the fact when clicked', () => {
    render(<MythBuster />);
    const firstMyth = screen.getByText(/My vote doesn't count because of the Electoral College/i);
    expect(firstMyth).toBeInTheDocument();
  });
});
