import { describe, it, expect, vi } from 'vitest';
import { retry } from '../../src/lib/retry';

describe('retry', () => {
  it('should return result immediately if function succeeds', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and eventually succeed', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('success');

    const result = await retry(fn, { retries: 3, delay: 10 }); // Short delay for test
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should fail if max retries reached', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'));

    await expect(retry(fn, { retries: 2, delay: 10 })).rejects.toThrow('always fail');
    expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });

  it('should use predicate to determine success', async () => {
    let counter = 0;
    const fn = vi.fn().mockImplementation(async () => {
      counter++;
      return { success: counter === 3 };
    });

    const result = await retry(fn, {
      retries: 5,
      delay: 10,
      predicate: (res) => res.success
    });

    expect(result).toEqual({ success: true });
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
