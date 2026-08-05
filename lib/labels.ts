/**
 * Pure, dependency-free label helpers.
 *
 * Kept separate from lib/data.ts (which imports node:fs and is server-only)
 * so client components can use it without pulling Node built-ins into the
 * browser bundle.
 */
export function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
