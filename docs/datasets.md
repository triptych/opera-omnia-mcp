# Opera Omnia Datasets

This document provides an overview of the datasets available in the Opera Omnia project and how to access them through the MCP server.

## Dataset Structure

Each dataset in Opera Omnia follows a consistent JSON structure:

```json
{
  "description": "Description of the content",
  "items": [
    "item1",
    "item2",
    ...
  ]
}
```

## Available Categories

The Opera Omnia project organizes datasets into the following categories:

### Attributes

Descriptive elements that can be applied to characters, objects, or settings.

- **adjectives.json**: Descriptive words that can modify nouns

### Characters

Character-related content for creating NPCs, protagonists, or antagonists.

- **personalities.json**: Character personality traits and temperaments
- **backstories.json**: Background stories and origins for characters

### Equipment

Items, gear, and objects that characters might use or encounter.

- **armor.json**: Protective gear and clothing
- **tools.json**: Utility items and implements
- **potions.json**: Magical or alchemical concoctions
- **artifacts.json**: Unique and powerful magical items
- **jewelry.json**: Decorative and potentially magical accessories
- **mounts.json**: Creatures or vehicles for transportation
- **siege-weapons.json**: Large-scale military equipment
- **traps.json**: Hazards and snares

### RPG

Role-playing game elements for character creation and gameplay mechanics.

- **classes.json**: Character archetypes and professions
- **skills.json**: Abilities and proficiencies
- **status-effects.json**: Temporary conditions affecting characters
- **spells.json**: Magical abilities and incantations

### Situations

Quest and event templates for storytelling.

- **errands.json**: Simple tasks and missions
- **quests.json**: More complex adventures and objectives
- **adventures.json**: Complete adventure scenarios

### Story

Narrative elements for plot development.

- **plot-twists.json**: Unexpected story developments

### World

World-building components for creating settings and environments.

- **factions.json**: Organizations, guilds, and political groups
- **cultures.json**: Societal customs, beliefs, and practices

## Accessing Datasets with the MCP Server

### Listing Categories

To get a list of all available categories:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "list_categories",
  arguments: {}
});
```

### Listing Datasets in a Category

To get a list of all datasets within a specific category:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "list_datasets",
  arguments: {
    category: "equipment"
  }
});
```

### Getting a Complete Dataset

To retrieve the entire contents of a specific dataset:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_dataset",
  arguments: {
    category: "equipment",
    dataset: "artifacts"
  }
});
```

### Getting a Random Item

To get a random item from a specific dataset:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_random_item",
  arguments: {
    category: "rpg",
    dataset: "classes"
  }
});
```

### Filtering Items

To filter items in a dataset based on a search string:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_filtered_items",
  arguments: {
    category: "equipment",
    dataset: "weapons",
    filter: "sword"
  }
});
```

### Combining Datasets

To combine multiple datasets and get random selections:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "combine_datasets",
  arguments: {
    datasets: [
      { category: "equipment", dataset: "weapons" },
      { category: "equipment", dataset: "armor" }
    ],
    count: 3
  }
});
```

### Generating Content with Templates

To generate creative content using a template and multiple datasets:

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "generate_content",
  arguments: {
    template: "The {adjective} {class} wields a {weapon} and wears {armor}.",
    datasets: {
      adjective: { category: "attributes", dataset: "adjectives" },
      class: { category: "rpg", dataset: "classes" },
      weapon: { category: "equipment", dataset: "weapons" },
      armor: { category: "equipment", dataset: "armor" }
    }
  }
});
```

## Using Resources

In addition to tools, the Opera Omnia MCP server also provides resources for browsing the available datasets:

### List All Categories

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://categories"
});
```

### List Datasets in a Category

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://category/equipment"
});
```

### Get Dataset Contents

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://dataset/equipment/weapons"
});
```

## Creative Uses

The Opera Omnia datasets can be combined in various ways for creative applications:

1. **Character Generation**: Combine personality traits, classes, equipment, and backstories
2. **Quest Creation**: Use situations, plot twists, and factions to create adventures
3. **World Building**: Combine cultures, factions, and locations to create rich settings
4. **Item Generation**: Create unique equipment by combining attributes with item types
5. **Story Prompts**: Generate writing prompts by combining characters, situations, and plot twists
