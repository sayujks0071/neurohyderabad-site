// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Calendar from './Calendar';

// Mock Tooltip to just render children to simplify testing
vi.mock('./Tooltip', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Calendar Component UX', () => {
  beforeEach(() => {
    // Set system time to Oct 24, 2023
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 9, 24)); // Month is 0-indexed: 9 = Oct
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('disables Previous Month button when viewing current month', () => {
    render(
      <Calendar
        label="Test Calendar"
        value=""
        onChange={vi.fn()}
      />
    );

    // Should be showing October 2023
    expect(screen.getByText('October 2023')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /Previous month/i });

    // Expectation: Disabled to prevent navigating to past months
    expect(prevButton).toBeDisabled();
  });

  it('updates focus to 1st of month when navigating to next month', () => {
    render(
      <Calendar
        label="Test Calendar"
        value=""
        onChange={vi.fn()}
      />
    );

    // Initial focus should be on Today (Oct 24)
    const todayButton = screen.getByRole('button', { name: /October 24, 2023/i });
    expect(todayButton).toHaveAttribute('tabIndex', '0');

    // Go to Next Month (Nov 2023)
    const nextButton = screen.getByRole('button', { name: /Next month/i });
    fireEvent.click(nextButton);

    expect(screen.getByText('November 2023')).toBeInTheDocument();

    // Nov 1 should be focusable
    const nov1Button = screen.getByRole('button', { name: /November 1, 2023/i });

    // Expectation: Focus moves to 1st day of new month
    expect(nov1Button).toHaveAttribute('tabIndex', '0');
  });

  it('updates focus to Today when navigating back to current month', () => {
    render(
      <Calendar
        label="Test Calendar"
        value=""
        onChange={vi.fn()}
      />
    );

    // Go to Nov
    const nextButton = screen.getByRole('button', { name: /Next month/i });
    fireEvent.click(nextButton);

    // Go back to Oct
    const prevButton = screen.getByRole('button', { name: /Previous month/i });
    // Should be enabled since we are in future
    expect(prevButton).not.toBeDisabled();
    fireEvent.click(prevButton);

    expect(screen.getByText('October 2023')).toBeInTheDocument();

    // Focus should be on Today (Oct 24) not Oct 1 (which is past)
    const todayButton = screen.getByRole('button', { name: /October 24, 2023/i });
    expect(todayButton).toHaveAttribute('tabIndex', '0');
  });
});
