/**
 * Security utilities for the application.
 */

/**
 * Escapes special characters in a string to prevent HTML injection.
 * Neutralizes: <, >, &, ", '
 *
 * @param unsafe - The user input string to sanitize
 * @returns The sanitized string
 */
export function escapeHtml(unsafe: string | number | null | undefined): string {
  if (unsafe === null || unsafe === undefined) {
    return "";
  }

  const str = String(unsafe);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
