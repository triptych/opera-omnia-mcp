# Opera Omnia MCP Server

## Overview

This MCP server will provide access to the rich collection of JSON datasets from the [Opera Omnia](https://github.com/triptych/opera-omnia) project, a comprehensive library of creative content for games, storytelling, and bot development.

The Opera Omnia project contains various categories of data including:
- Attributes (adjectives)
- Characters (personalities, backstories)
- Equipment (armor, tools, potions, artifacts, etc.)
- RPG elements (classes, skills, status effects, spells)
- Situations (errands, quests, adventures)
- Story elements (plot twists)
- World-building components (factions, cultures)

## Goals

1. Create an MCP server that provides programmatic access to all Opera Omnia datasets
2. Enable filtering, combining, and random selection from datasets
3. Support both browsing the available data and targeted queries
4. Allow generation of creative content based on the datasets
5. Provide a simple, intuitive API for developers to integrate into their projects

## Architecture

The MCP server will be built using TypeScript and the MCP SDK. It will:

1. Fetch data from the GitHub repository or use cached local copies
2. Parse and organize the JSON datasets
3. Expose tools for querying and manipulating the data
4. Provide resources for browsing the available datasets

## Implementation Details

### Data Fetching

The server will support two modes of data access:
- **GitHub API**: Fetch data directly from the GitHub repository
- **Local Cache**: Use locally cached copies of the datasets for faster access

### MCP Tools

The server will expose the following tools:

1. `list_categories` - List all available data categories
2. `list_datasets` - List all datasets within a category
3. `get_dataset` - Get the complete contents of a specific dataset
4. `get_random_item` - Get a random item from a specific dataset
5. `get_filtered_items` - Get items from a dataset that match specific criteria
6. `combine_datasets` - Combine multiple datasets and get random selections
7. `generate_content` - Generate creative content based on multiple datasets

### MCP Resources

The server will expose resources for browsing the available datasets:

1. `opera-omnia://categories` - List of all categories
2. `opera-omnia://category/{category}` - List of datasets in a category
3. `opera-omnia://dataset/{category}/{dataset}` - Contents of a specific dataset

## Usage Examples

### Example 1: Get a random character concept

```javascript
// Get a random personality and backstory
const personality = await callTool('get_random_item', {
  category: 'characters',
  dataset: 'personalities'
});

const backstory = await callTool('get_random_item', {
  category: 'characters',
  dataset: 'backstories'
});

console.log(`Character Concept: ${personality} character who ${backstory}`);
```

### Example 2: Generate a quest

```javascript
// Generate a quest by combining multiple datasets
const quest = await callTool('generate_content', {
  template: "A {adjective} {class} must {quest} to obtain {artifact}",
  datasets: {
    adjective: { category: 'attributes', dataset: 'adjectives' },
    class: { category: 'rpg', dataset: 'classes' },
    quest: { category: 'situations', dataset: 'quests' },
    artifact: { category: 'equipment', dataset: 'artifacts' }
  }
});

console.log(`Quest: ${quest}`);
```

### Example 3: Browse available datasets

```javascript
// Access the categories resource
const categories = await accessResource('opera-omnia://categories');
console.log('Available categories:', categories);

// Access datasets in the 'equipment' category
const equipmentDatasets = await accessResource('opera-omnia://category/equipment');
console.log('Equipment datasets:', equipmentDatasets);
```

## Development Plan

1. Set up the TypeScript project with MCP SDK
2. Implement data fetching from GitHub
3. Create the core data access functions
4. Implement MCP tools
5. Implement MCP resources
6. Add caching for performance
7. Write documentation and examples
8. Test with various use cases

## Future Enhancements

1. Add support for user-contributed datasets
2. Implement more sophisticated content generation
3. Add visualization tools for exploring the data
4. Create integration examples for popular frameworks and platforms
