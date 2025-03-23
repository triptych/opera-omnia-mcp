/**
 * Utility functions for Opera Omnia MCP server
 */

/**
 * Get a random item from an array
 */
export function getRandomItem<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

/**
 * Filter items based on a search string
 */
export function filterItems(items: string[], filter: string): string[] {
  const lowerFilter = filter.toLowerCase();
  return items.filter(item => item.toLowerCase().includes(lowerFilter));
}

/**
 * Replace template placeholders with values
 * Example: "A {adjective} {animal}" with {adjective: "quick", animal: "fox"}
 * becomes "A quick fox"
 */
export function processTemplate(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(values)) {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }

  return result;
}

/**
 * Validate that a string is a valid category name
 */
export function isValidCategory(category: string): boolean {
  // Add validation logic if needed
  return typeof category === 'string' && category.trim().length > 0;
}

/**
 * Validate that a string is a valid dataset name
 */
export function isValidDataset(dataset: string): boolean {
  // Add validation logic if needed
  return typeof dataset === 'string' && dataset.trim().length > 0;
}

/**
 * Format error message for MCP response
 */
export function formatErrorResponse(error: unknown): string {
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }
  return `Unknown error: ${String(error)}`;
}
