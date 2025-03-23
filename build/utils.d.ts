/**
 * Utility functions for Opera Omnia MCP server
 */
/**
 * Get a random item from an array
 */
export declare function getRandomItem<T>(items: T[]): T;
/**
 * Filter items based on a search string
 */
export declare function filterItems(items: string[], filter: string): string[];
/**
 * Replace template placeholders with values
 * Example: "A {adjective} {animal}" with {adjective: "quick", animal: "fox"}
 * becomes "A quick fox"
 */
export declare function processTemplate(template: string, values: Record<string, string>): string;
/**
 * Validate that a string is a valid category name
 */
export declare function isValidCategory(category: string): boolean;
/**
 * Validate that a string is a valid dataset name
 */
export declare function isValidDataset(dataset: string): boolean;
/**
 * Format error message for MCP response
 */
export declare function formatErrorResponse(error: unknown): string;
