// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../Button';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('Button', () => {
  it('passes accessibility attributes to the link', () => {
    render(
      <Button href="/test" aria-describedby="desc-id" id="btn-link">
        Link Button
      </Button>
    );

    const link = screen.getByRole('link', { name: /Link Button/i });
    expect(link).toHaveAttribute('href', '/test');

    // This is expected to fail currently
    expect(link).toHaveAttribute('aria-describedby', 'desc-id');
    expect(link).toHaveAttribute('id', 'btn-link');
  });

  it('passes accessibility attributes to the button', () => {
    render(
      <Button aria-describedby="desc-id" id="btn-button" onClick={() => {}}>
        Action Button
      </Button>
    );

    const btn = screen.getByRole('button', { name: /Action Button/i });

    // This should pass as button spreads props
    expect(btn).toHaveAttribute('aria-describedby', 'desc-id');
    expect(btn).toHaveAttribute('id', 'btn-button');
  });
});
