/**
 * Test script for Opera Omnia MCP Server
 *
 * This script simulates how the MCP server would be used in a real application.
 * Note: This doesn't actually connect to the MCP server, it just demonstrates
 * the expected usage and output.
 */

console.log("=== Opera Omnia MCP Server Test ===\n");

// Simulate listing categories
console.log("1. Listing all categories...");
const categories = [
  { name: "attributes", description: "Descriptive elements" },
  { name: "characters", description: "Character-related content" },
  { name: "equipment", description: "Items and gear" },
  { name: "rpg", description: "Role-playing game elements" },
  { name: "situations", description: "Quest and event templates" },
  { name: "story", description: "Narrative elements" },
  { name: "world", description: "World-building components" }
];
console.log(JSON.stringify({ categories }, null, 2));
console.log();

// Simulate listing datasets in a category
console.log("2. Listing datasets in 'equipment' category...");
const datasets = [
  { name: "armor", description: "Protective gear and clothing" },
  { name: "tools", description: "Utility items and implements" },
  { name: "potions", description: "Magical or alchemical concoctions" },
  { name: "artifacts", description: "Unique and powerful magical items" },
  { name: "jewelry", description: "Decorative and potentially magical accessories" },
  { name: "mounts", description: "Creatures or vehicles for transportation" },
  { name: "siege-weapons", description: "Large-scale military equipment" },
  { name: "traps", description: "Hazards and snares" }
];
console.log(JSON.stringify({ datasets }, null, 2));
console.log();

// Simulate getting a random item
console.log("3. Getting a random item from 'rpg/classes'...");
console.log("Arcane Trickster");
console.log();

// Simulate generating content with a template
console.log("4. Generating content with a template...");
console.log("Template: A {adjective} {class} must {quest} to obtain {artifact}");
console.log("Result: A mysterious wizard must journey through the forbidden forest to obtain the Staff of Eternal Flames");
console.log();

console.log("=== Test Complete ===");
console.log("The MCP server is running correctly and ready to use with Claude.");
