/**
 * Example: Generate a random quest using the Opera Omnia MCP server
 *
 * This example demonstrates how to use the generate_content tool to create
 * a random quest by combining elements from different datasets.
 *
 * To run this example:
 * 1. Make sure the Opera Omnia MCP server is running
 * 2. Run: node examples/random-quest.js
 */

// In a real application, you would use the MCP client to call the tool
// This is a simulation of what the result might look like

const generateQuest = async () => {
  // Simulate calling the generate_content tool
  const result = {
    template: "A {adjective} {class} must {quest} to obtain {artifact}",
    datasets: {
      adjective: { category: "attributes", dataset: "adjectives" },
      class: { category: "rpg", dataset: "classes" },
      quest: { category: "situations", dataset: "quests" },
      artifact: { category: "equipment", dataset: "artifacts" }
    }
  };

  console.log("Generating random quest...");
  console.log("Template:", result.template);
  console.log("Using datasets:");
  Object.entries(result.datasets).forEach(([key, value]) => {
    console.log(`  - ${key}: ${value.category}/${value.dataset}`);
  });

  // Simulate the response from the MCP server
  // In a real application, this would be the actual response from the server
  const response = "A mysterious wizard must journey through the forbidden forest to obtain the Staff of Eternal Flames";

  console.log("\nGenerated Quest:");
  console.log(response);
};

// Run the example
generateQuest().catch(console.error);
