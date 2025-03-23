# Setting Up Opera Omnia MCP Server with Claude Desktop

This guide explains how to set up the Opera Omnia MCP server to work with the Claude desktop application.

## Prerequisites

- Node.js (v14 or higher)
- Claude desktop application installed
- Opera Omnia MCP server repository cloned to your local machine

## Installation Steps

1. **Build the Opera Omnia MCP server**

   Navigate to the Opera Omnia MCP server directory and run:

   ```bash
   npm install
   npm run build
   ```

2. **Configure Claude Desktop**

   You need to add the Opera Omnia MCP server to the Claude desktop configuration file:

   - Open the Claude desktop configuration file:
     - On Windows: `%APPDATA%\Claude\claude_desktop_config.json`
     - On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - On Linux: `~/.config/Claude/claude_desktop_config.json`

   - Add the Opera Omnia MCP server configuration to the `mcpServers` section:

   ```json
   {
     "mcpServers": {
       "opera-omnia": {
         "command": "node",
         "args": ["<path-to-opera-omnia-mcp>/build/index.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

   Replace `<path-to-opera-omnia-mcp>` with the actual path to the Opera Omnia MCP server directory on your system.

3. **Restart Claude Desktop**

   Close and reopen the Claude desktop application to load the new configuration.

## Verifying the Setup

To verify that the Opera Omnia MCP server is working correctly with Claude:

1. Open Claude desktop
2. Type a message like: "Generate a random character concept using the Opera Omnia datasets"
3. Claude should respond by using the Opera Omnia MCP server to generate a character

## Troubleshooting

If you encounter issues:

1. **Check the Claude desktop logs**:
   - On Windows: `%APPDATA%\Claude\logs`
   - On macOS: `~/Library/Logs/Claude`
   - On Linux: `~/.config/Claude/logs`

2. **Verify the path in the configuration**:
   - Make sure the path to the Opera Omnia MCP server is correct
   - Use absolute paths to avoid any issues

3. **Check the MCP server**:
   - Try running the server manually: `node build/index.js`
   - Check for any error messages

## Using the Opera Omnia MCP Server

Once set up, you can ask Claude to:

- Generate random characters
- Create quest ideas
- Get random items from specific datasets
- Combine multiple datasets for creative content
- Filter datasets for specific themes

Example prompts:

- "Generate a random fantasy character using Opera Omnia"
- "Create a quest involving a wizard and a magical artifact"
- "Give me 5 random fantasy weapons from Opera Omnia"
- "Create a character backstory involving betrayal and redemption"
