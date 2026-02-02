/**
 * Utility function to retry a promise-returning function with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    factor?: number;
    name?: string;
    predicate?: (res: T) => boolean;
    onRetry?: (attempt: number, error: unknown) => void;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    factor = 2,
    name = "operation",
    predicate,
    onRetry
  } = options;

  for (let i = 0; i <= retries; i++) {
    try {
      const result = await fn();
      if (predicate && !predicate(result)) {
        throw new Error(`Predicate check failed`);
      }
      return result;
    } catch (error) {
      if (i === retries) {
        throw error;
      }

      const waitTime = delay * Math.pow(factor, i);

      if (onRetry) {
        onRetry(i + 1, error);
      } else {
        // Default logging if no callback provided
        console.warn(`[Retry] ${name} attempt ${i + 1}/${retries} failed. Retrying in ${waitTime}ms. Error: ${error instanceof Error ? error.message : String(error)}`);
      }

      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw new Error(`${name} failed after ${retries} retries`);
}
