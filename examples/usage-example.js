/**
 * Opera Omnia MCP Server - Usage Example
 *
 * This script demonstrates how to use the Opera Omnia MCP server
 * in a real application. It shows how to call the various tools
 * and use the results to create a complete RPG character.
 *
 * Note: This is a simulation of how the MCP server would be used.
 * In a real application, you would use the MCP client to call the tools.
 */

// Simulate MCP client
async function useMcpTool(params) {
  console.log(`Calling MCP tool: ${params.tool_name}`);
  console.log(`Arguments: ${JSON.stringify(params.arguments, null, 2)}`);

  // Simulate responses based on the tool being called
  switch (params.tool_name) {
    case 'list_categories':
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              categories: [
                { name: "attributes", description: "Descriptive elements" },
                { name: "characters", description: "Character-related content" },
                { name: "equipment", description: "Items and gear" },
                { name: "rpg", description: "Role-playing game elements" },
                { name: "situations", description: "Quest and event templates" },
                { name: "story", description: "Narrative elements" },
                { name: "world", description: "World-building components" }
              ]
            }, null, 2)
          }
        ]
      };

    case 'get_random_item':
      // Return different items based on the category and dataset
      if (params.arguments.category === 'rpg' && params.arguments.dataset === 'classes') {
        return { content: [{ type: 'text', text: 'Paladin' }] };
      } else if (params.arguments.category === 'characters' && params.arguments.dataset === 'personalities') {
        return { content: [{ type: 'text', text: 'Stoic and reserved, but fiercely loyal to allies' }] };
      } else if (params.arguments.category === 'characters' && params.arguments.dataset === 'backstories') {
        return { content: [{ type: 'text', text: 'Was once a temple guard who witnessed a miracle and devoted their life to a divine cause' }] };
      } else if (params.arguments.category === 'equipment' && params.arguments.dataset === 'armor') {
        return { content: [{ type: 'text', text: 'Gleaming Plate Armor of the Righteous' }] };
      } else if (params.arguments.category === 'equipment' && params.arguments.dataset === 'weapons') {
        return { content: [{ type: 'text', text: 'Warhammer of Justice' }] };
      }
      return { content: [{ type: 'text', text: 'Random item' }] };

    case 'generate_content':
      return {
        content: [
          {
            type: 'text',
            text: 'A noble paladin must travel to the Forgotten Temple to recover a sacred relic stolen by cultists'
          }
        ]
      };

    default:
      return { content: [{ type: 'text', text: 'Unknown tool' }] };
  }
}

// Main function to generate a character
async function generateCharacter() {
  console.log("=== Generating RPG Character using Opera Omnia MCP Server ===\n");

  // Step 1: Get a random class
  console.log("Step 1: Getting a random class...");
  const classResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "get_random_item",
    arguments: {
      category: "rpg",
      dataset: "classes"
    }
  });
  const characterClass = classResponse.content[0].text;
  console.log(`Class: ${characterClass}\n`);

  // Step 2: Get a random personality trait
  console.log("Step 2: Getting a random personality trait...");
  const personalityResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "get_random_item",
    arguments: {
      category: "characters",
      dataset: "personalities"
    }
  });
  const personality = personalityResponse.content[0].text;
  console.log(`Personality: ${personality}\n`);

  // Step 3: Get a random backstory
  console.log("Step 3: Getting a random backstory...");
  const backstoryResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "get_random_item",
    arguments: {
      category: "characters",
      dataset: "backstories"
    }
  });
  const backstory = backstoryResponse.content[0].text;
  console.log(`Backstory: ${backstory}\n`);

  // Step 4: Get random equipment
  console.log("Step 4: Getting random equipment...");
  const armorResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "get_random_item",
    arguments: {
      category: "equipment",
      dataset: "armor"
    }
  });
  const armor = armorResponse.content[0].text;

  const weaponResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "get_random_item",
    arguments: {
      category: "equipment",
      dataset: "weapons"
    }
  });
  const weapon = weaponResponse.content[0].text;

  console.log("Equipment:");
  console.log(`  - ${armor}`);
  console.log(`  - ${weapon}`);
  console.log();

  // Step 5: Generate a quest
  console.log("Step 5: Generating a quest...");
  const questResponse = await useMcpTool({
    server_name: "opera-omnia",
    tool_name: "generate_content",
    arguments: {
      template: "A {adjective} {class} must {quest} to obtain {artifact}",
      datasets: {
        adjective: { category: "attributes", dataset: "adjectives" },
        class: { category: "rpg", dataset: "classes" },
        quest: { category: "situations", dataset: "quests" },
        artifact: { category: "equipment", dataset: "artifacts" }
      }
    }
  });
  const quest = questResponse.content[0].text;
  console.log(`Quest: ${quest}\n`);

  // Step 6: Combine everything into a character sheet
  console.log("=== COMPLETE CHARACTER SHEET ===");
  console.log(`CLASS: ${characterClass}`);
  console.log(`PERSONALITY: ${personality}`);
  console.log(`BACKSTORY: ${backstory}`);
  console.log("EQUIPMENT:");
  console.log(`  - ${armor}`);
  console.log(`  - ${weapon}`);
  console.log(`CURRENT QUEST: ${quest}`);
  console.log("===============================");
}

// Run the example
generateCharacter().catch(console.error);
