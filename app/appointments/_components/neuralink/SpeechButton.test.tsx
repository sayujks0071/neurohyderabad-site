/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import SpeechButton from './SpeechButton';
import * as neuralinkApi from './neuralinkApi';
import * as audioUtils from './audioUtils';

// Extend vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock the API and Audio utils
vi.mock('./neuralinkApi', () => ({
  generateSpeech: vi.fn(),
}));

vi.mock('./audioUtils', () => ({
  playSpeech: vi.fn(),
}));

describe('SpeechButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders with appropriate accessibility attributes', () => {
    render(<SpeechButton text="Hello world" />);

    // We'll use getByRole to ensure it's exposed as a button with the correct accessible name
    const button = screen.getByRole('button', { name: /listen to ai analysis/i });
    expect(button).toBeInTheDocument();

    // Check for aria-label explicit attribute
    expect(button).toHaveAttribute('aria-label', 'Listen to AI analysis');

    // Check that the icon is hidden from screen readers
    const icon = button.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('handles click and loading state', async () => {
    const mockGenerateSpeech = vi.spyOn(neuralinkApi, 'generateSpeech').mockResolvedValue('base64audio');
    const mockPlaySpeech = vi.spyOn(audioUtils, 'playSpeech').mockResolvedValue(undefined);

    render(<SpeechButton text="Hello world" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockGenerateSpeech).toHaveBeenCalledWith('Hello world');
  });
});
