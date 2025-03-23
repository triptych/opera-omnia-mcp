/**
 * Example: Character Generator using the Opera Omnia MCP server
 *
 * This example demonstrates how to use multiple tools from the Opera Omnia MCP server
 * to generate a complete character concept for a role-playing game.
 *
 * To run this example:
 * 1. Make sure the Opera Omnia MCP server is running
 * 2. Run: node examples/character-generator.js
 */

// In a real application, you would use the MCP client to call the tools
// This is a simulation of what the result might look like

const generateCharacter = async () => {
  console.log("Generating RPG Character...\n");

  // Step 1: Get a random personality trait
  console.log("Step 1: Getting a random personality trait...");
  const personality = "Stoic and reserved, but fiercely loyal to allies";
  console.log(`Personality: ${personality}\n`);

  // Step 2: Get a random class
  console.log("Step 2: Getting a random class...");
  const characterClass = "Paladin";
  console.log(`Class: ${characterClass}\n`);

  // Step 3: Get random equipment items
  console.log("Step 3: Getting random equipment...");
  const equipment = [
    "Gleaming Plate Armor of the Righteous",
    "Shield of Divine Protection",
    "Warhammer of Justice"
  ];
  console.log("Equipment:");
  equipment.forEach(item => console.log(`  - ${item}`));
  console.log();

  // Step 4: Get a random backstory
  console.log("Step 4: Getting a random backstory...");
  const backstory = "Was once a temple guard who witnessed a miracle and devoted their life to a divine cause";
  console.log(`Backstory: ${backstory}\n`);

  // Step 5: Generate a quest for the character
  console.log("Step 5: Generating a quest...");
  const quest = "Must travel to the Forgotten Temple to recover a sacred relic stolen by cultists";
  console.log(`Quest: ${quest}\n`);

  // Step 6: Combine everything into a character sheet
  console.log("=== COMPLETE CHARACTER SHEET ===");
  console.log(`CLASS: ${characterClass}`);
  console.log(`PERSONALITY: ${personality}`);
  console.log("EQUIPMENT:");
  equipment.forEach(item => console.log(`  - ${item}`));
  console.log(`BACKSTORY: ${backstory}`);
  console.log(`CURRENT QUEST: ${quest}`);
  console.log("===============================");
};

// Run the example
generateCharacter().catch(console.error);
