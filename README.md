# Opera Omnia MCP Server

An MCP server that provides access to the rich collection of JSON datasets from the [Opera Omnia](https://github.com/triptych/opera-omnia) project, a comprehensive library of creative content for games, storytelling, and bot development.

## Features

- Access to all Opera Omnia datasets
- Random selection from datasets
- Filtering datasets by criteria
- Combining multiple datasets
- Generating creative content using templates

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Running the Server

```bash
npm start
```

### MCP Configuration

Add the following to your MCP settings file:

```json
{
  "mcpServers": {
    "opera-omnia": {
      "command": "node",
      "args": ["path/to/opera-omnia-mcp/build/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace `path/to/opera-omnia-mcp` with the actual path to this project.

## Available Tools

### list_categories

List all available data categories.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "list_categories",
  arguments: {}
});
```

### list_datasets

List all datasets within a category.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "list_datasets",
  arguments: {
    category: "characters"
  }
});
```

### get_dataset

Get the complete contents of a specific dataset.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_dataset",
  arguments: {
    category: "characters",
    dataset: "personalities"
  }
});
```

### get_random_item

Get a random item from a specific dataset.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_random_item",
  arguments: {
    category: "characters",
    dataset: "personalities"
  }
});
```

### get_filtered_items

Get items from a dataset that match specific criteria.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "get_filtered_items",
  arguments: {
    category: "characters",
    dataset: "personalities",
    filter: "brave"
  }
});
```

### combine_datasets

Combine multiple datasets and get random selections.

```javascript
const result = await use_mcp_tool({
  server_name: "opera-omnia",
  tool_name: "combine_datasets",
  arguments: {
    datasets: [
      { category: "characters", dataset: "personalities" },
      { category: "characters", dataset: "backstories" }
    ],
    count: 3
  }
});
```

### generate_content

Generate creative content based on multiple datasets.

```javascript
const result = await use_mcp_tool({
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
```

## Available Resources

### opera-omnia://categories

List of all available data categories.

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://categories"
});
```

### opera-omnia://category/{category}

List of datasets available in a specific category.

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://category/characters"
});
```

### opera-omnia://dataset/{category}/{dataset}

Contents of a specific dataset.

```javascript
const result = await access_mcp_resource({
  server_name: "opera-omnia",
  uri: "opera-omnia://dataset/characters/personalities"
});
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
