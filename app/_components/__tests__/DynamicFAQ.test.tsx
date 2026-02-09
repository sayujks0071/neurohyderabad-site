import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import DynamicFAQ from '../DynamicFAQ';

expect.extend(matchers);

// @vitest-environment jsdom

describe('DynamicFAQ', () => {
  const mockFaqs = [
    {
      id: 'faq-1',
      question: 'What is neurosurgery?',
      answer: 'Neurosurgery is surgery of the nervous system.',
      category: 'General',
      sources: []
    }
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, faqs: mockFaqs }),
      })
    ) as unknown as typeof fetch;
  });

  it('renders correctly and has accessible attributes', async () => {
    render(<DynamicFAQ topic="Neurosurgery" />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /What is neurosurgery\?/i });
    expect(button).toBeInTheDocument();

    // Check initial state
    expect(button).toHaveAttribute('aria-expanded', 'false');
    const controlsId = button.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    const buttonId = button.getAttribute('id');
    expect(buttonId).toBeTruthy();

    // Click to expand
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Content should be visible
    const content = screen.getByRole('region');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('id', controlsId);
    expect(content).toHaveAttribute('aria-labelledby', buttonId);
    expect(content).toHaveTextContent('Neurosurgery is surgery of the nervous system.');
  });
});
