// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import MicrosoftClarity from '../MicrosoftClarity';

expect.extend(matchers);

// Mock next/script
vi.mock('next/script', () => {
  return {
    default: (props: any) => {
      return (
        <div
          data-testid="mock-script"
          data-strategy={props.strategy}
        >
          {props.children}
        </div>
      );
    },
  };
});

describe('MicrosoftClarity', () => {
  it('should use lazyOnload strategy for better performance', () => {
    const { getByTestId } = render(<MicrosoftClarity />);
    const script = getByTestId('mock-script');

    // This expectation will fail initially because the current strategy is 'afterInteractive'
    expect(script).toHaveAttribute('data-strategy', 'lazyOnload');
  });
});
