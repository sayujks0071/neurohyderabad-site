import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Faq from './Faq';

// @vitest-environment jsdom

test('Faq renders questions and answers correctly with accessibility attributes', async () => {
  render(<Faq />);

  // Find the first FAQ button (which has the question text)
  const firstButton = screen.getByRole('button', { name: /What conditions do you treat\?/i });
  expect(firstButton).toBeDefined();

  // It should be collapsed initially
  expect(firstButton.getAttribute('aria-expanded')).toBe('false');

  // We can't see the answer yet
  const firstAnswerText = /Dr. Sayuj Krishnan specializes in brain tumors/i;
  expect(screen.queryByText(firstAnswerText)).toBeNull();

  // Click to expand
  fireEvent.click(firstButton);

  // Now it should be expanded
  expect(firstButton.getAttribute('aria-expanded')).toBe('true');

  // The answer should be visible
  expect(screen.getByText(firstAnswerText)).toBeDefined();

  // The answer region should have correct role and aria-labelledby
  const region = screen.getByRole('region');
  const regionId = region.getAttribute('id');
  expect(region.getAttribute('aria-labelledby')).toBe(firstButton.getAttribute('id'));
  expect(firstButton.getAttribute('aria-controls')).toBe(regionId);
});
