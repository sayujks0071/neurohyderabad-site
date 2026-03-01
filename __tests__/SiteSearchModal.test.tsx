// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import SiteSearchModal from '../app/components/SiteSearchModal';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}));

describe('Search Results Announcer', () => {
    it('announces the number of results found', async () => {
        vi.useFakeTimers();

        global.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ results: [{ href: '/a', title: 'Result 1' }, { href: '/b', title: 'Result 2' }] })
        })) as any;

        render(<SiteSearchModal onClose={() => {}} />);
        const input = screen.getAllByRole('combobox')[0];

        act(() => {
            fireEvent.change(input, { target: { value: 'spine' } });
            vi.advanceTimersByTime(300); // Trigger debounce
        });

        // Resolve promises from async fetch
        await act(async () => {
            await Promise.resolve(); // fetch
            await Promise.resolve(); // response.json()
            await Promise.resolve(); // setState
        });

        const status = screen.getAllByRole('status')[0];
        expect(status.textContent).toBe('2 results found.');

        vi.useRealTimers();
    });
});
