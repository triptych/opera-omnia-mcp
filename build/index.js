#!/usr/bin/env node
import { CallToolRequestSchema, ErrorCode, ListResourcesRequestSchema, ListResourceTemplatesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, Server, StdioServerTransport, createMcpError } from './mcp-sdk.js';
import { DataFetcher } from './data-fetcher.js';
import { filterItems, formatErrorResponse, getRandomItem, processTemplate } from './utils.js';
// Initialize the data fetcher
const dataFetcher = new DataFetcher();
class OperaOmniaMcpServer {
    constructor() {
        this.server = new Server({
            name: 'opera-omnia-server',
            version: '0.1.0',
        }, {
            capabilities: {
                resources: {},
                tools: {},
            },
        });
        // Set up error handling
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        // Handle process termination
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
        // Register request handlers
        this.setupResourceHandlers();
        this.setupToolHandlers();
    }
    /**
     * Set up resource handlers for browsing datasets
     */
    setupResourceHandlers() {
        // List available resources
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
            resources: [
                {
                    uri: 'opera-omnia://categories',
                    name: 'Opera Omnia Categories',
                    description: 'List of all available data categories',
                    mimeType: 'application/json',
                },
            ],
        }));
        // List resource templates
        this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
            resourceTemplates: [
                {
                    uriTemplate: 'opera-omnia://category/{category}',
                    name: 'Datasets in Category',
                    description: 'List of datasets available in a specific category',
                    mimeType: 'application/json',
                },
                {
                    uriTemplate: 'opera-omnia://dataset/{category}/{dataset}',
                    name: 'Dataset Contents',
                    description: 'Contents of a specific dataset',
                    mimeType: 'application/json',
                },
            ],
        }));
        // Handle resource requests
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            try {
                const { uri } = request.params;
                let content;
                // Categories resource
                if (uri === 'opera-omnia://categories') {
                    const categories = await dataFetcher.getCategories();
                    content = JSON.stringify(categories, null, 2);
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'application/json',
                                text: content,
                            },
                        ],
                    };
                }
                // Category datasets resource
                const categoryMatch = uri.match(/^opera-omnia:\/\/category\/(.+)$/);
                if (categoryMatch) {
                    const category = decodeURIComponent(categoryMatch[1]);
                    const datasets = await dataFetcher.getDatasetsInCategory(category);
                    content = JSON.stringify(datasets, null, 2);
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'application/json',
                                text: content,
                            },
                        ],
                    };
                }
                // Dataset contents resource
                const datasetMatch = uri.match(/^opera-omnia:\/\/dataset\/(.+)\/(.+)$/);
                if (datasetMatch) {
                    const category = decodeURIComponent(datasetMatch[1]);
                    const dataset = decodeURIComponent(datasetMatch[2]);
                    const datasetContent = await dataFetcher.getDataset(category, dataset);
                    content = JSON.stringify(datasetContent, null, 2);
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'application/json',
                                text: content,
                            },
                        ],
                    };
                }
                throw createMcpError(ErrorCode.InvalidRequest, `Invalid resource URI: ${uri}`);
            }
            catch (error) {
                console.error('Error handling resource request:', error);
                throw createMcpError(ErrorCode.InternalError, formatErrorResponse(error));
            }
        });
    }
    /**
     * Set up tool handlers for interacting with datasets
     */
    setupToolHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'list_categories',
                    description: 'List all available data categories',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                        required: [],
                    },
                },
                {
                    name: 'list_datasets',
                    description: 'List all datasets within a category',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: {
                                type: 'string',
                                description: 'Category name',
                            },
                        },
                        required: ['category'],
                    },
                },
                {
                    name: 'get_dataset',
                    description: 'Get the complete contents of a specific dataset',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: {
                                type: 'string',
                                description: 'Category name',
                            },
                            dataset: {
                                type: 'string',
                                description: 'Dataset name',
                            },
                        },
                        required: ['category', 'dataset'],
                    },
                },
                {
                    name: 'get_random_item',
                    description: 'Get a random item from a specific dataset',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: {
                                type: 'string',
                                description: 'Category name',
                            },
                            dataset: {
                                type: 'string',
                                description: 'Dataset name',
                            },
                        },
                        required: ['category', 'dataset'],
                    },
                },
                {
                    name: 'get_filtered_items',
                    description: 'Get items from a dataset that match specific criteria',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: {
                                type: 'string',
                                description: 'Category name',
                            },
                            dataset: {
                                type: 'string',
                                description: 'Dataset name',
                            },
                            filter: {
                                type: 'string',
                                description: 'Text to filter items by (case-insensitive)',
                            },
                        },
                        required: ['category', 'dataset', 'filter'],
                    },
                },
                {
                    name: 'combine_datasets',
                    description: 'Combine multiple datasets and get random selections',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            datasets: {
                                type: 'array',
                                description: 'Array of datasets to combine',
                                items: {
                                    type: 'object',
                                    properties: {
                                        category: {
                                            type: 'string',
                                            description: 'Category name',
                                        },
                                        dataset: {
                                            type: 'string',
                                            description: 'Dataset name',
                                        },
                                    },
                                    required: ['category', 'dataset'],
                                },
                            },
                            count: {
                                type: 'number',
                                description: 'Number of items to return (default: 1)',
                            },
                        },
                        required: ['datasets'],
                    },
                },
                {
                    name: 'generate_content',
                    description: 'Generate creative content based on multiple datasets',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            template: {
                                type: 'string',
                                description: 'Template string with placeholders in {curly braces}',
                            },
                            datasets: {
                                type: 'object',
                                description: 'Mapping of placeholder names to datasets',
                                additionalProperties: {
                                    type: 'object',
                                    properties: {
                                        category: {
                                            type: 'string',
                                            description: 'Category name',
                                        },
                                        dataset: {
                                            type: 'string',
                                            description: 'Dataset name',
                                        },
                                    },
                                    required: ['category', 'dataset'],
                                },
                            },
                        },
                        required: ['template', 'datasets'],
                    },
                },
            ],
        }));
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const { name, arguments: args } = request.params;
                switch (name) {
                    case 'list_categories':
                        return this.handleListCategories();
                    case 'list_datasets': {
                        const typedArgs = args;
                        return this.handleListDatasets(typedArgs);
                    }
                    case 'get_dataset': {
                        const typedArgs = args;
                        return this.handleGetDataset(typedArgs);
                    }
                    case 'get_random_item': {
                        const typedArgs = args;
                        return this.handleGetRandomItem(typedArgs);
                    }
                    case 'get_filtered_items': {
                        const typedArgs = args;
                        return this.handleGetFilteredItems(typedArgs);
                    }
                    case 'combine_datasets': {
                        const typedArgs = args;
                        return this.handleCombineDatasets(typedArgs);
                    }
                    case 'generate_content': {
                        const typedArgs = args;
                        return this.handleGenerateContent(typedArgs);
                    }
                    default:
                        throw createMcpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
                }
            }
            catch (error) {
                console.error('Error handling tool call:', error);
                return {
                    content: [
                        {
                            type: 'text',
                            text: formatErrorResponse(error),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    /**
     * Handle list_categories tool
     */
    async handleListCategories() {
        const categories = await dataFetcher.getCategories();
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({ categories }, null, 2),
                },
            ],
        };
    }
    /**
     * Handle list_datasets tool
     */
    async handleListDatasets(args) {
        const { category } = args;
        const datasets = await dataFetcher.getDatasetsInCategory(category);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({ datasets }, null, 2),
                },
            ],
        };
    }
    /**
     * Handle get_dataset tool
     */
    async handleGetDataset(args) {
        const { category, dataset } = args;
        const datasetContent = await dataFetcher.getDataset(category, dataset);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(datasetContent, null, 2),
                },
            ],
        };
    }
    /**
     * Handle get_random_item tool
     */
    async handleGetRandomItem(args) {
        const { category, dataset } = args;
        const datasetContent = await dataFetcher.getDataset(category, dataset);
        const randomItem = getRandomItem(datasetContent.items);
        return {
            content: [
                {
                    type: 'text',
                    text: randomItem,
                },
            ],
        };
    }
    /**
     * Handle get_filtered_items tool
     */
    async handleGetFilteredItems(args) {
        const { category, dataset, filter } = args;
        const datasetContent = await dataFetcher.getDataset(category, dataset);
        const filteredItems = filterItems(datasetContent.items, filter);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(filteredItems, null, 2),
                },
            ],
        };
    }
    /**
     * Handle combine_datasets tool
     */
    async handleCombineDatasets(args) {
        const { datasets, count = 1 } = args;
        // Fetch all datasets
        const allItems = [];
        for (const { category, dataset } of datasets) {
            const datasetContent = await dataFetcher.getDataset(category, dataset);
            allItems.push(...datasetContent.items);
        }
        // Get random items
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(getRandomItem(allItems));
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    /**
     * Handle generate_content tool
     */
    async handleGenerateContent(args) {
        const { template, datasets } = args;
        // Get a random item from each dataset
        const values = {};
        for (const [key, { category, dataset }] of Object.entries(datasets)) {
            const datasetContent = await dataFetcher.getDataset(category, dataset);
            values[key] = getRandomItem(datasetContent.items);
        }
        // Process the template
        const result = processTemplate(template, values);
        return {
            content: [
                {
                    type: 'text',
                    text: result,
                },
            ],
        };
    }
    /**
     * Start the MCP server
     */
    async run() {
        try {
            // Initialize data fetcher
            await dataFetcher.initialize();
            // Connect to transport
            const transport = new StdioServerTransport();
            await this.server.connect(transport);
            console.error('Opera Omnia MCP server running on stdio');
        }
        catch (error) {
            console.error('Failed to start MCP server:', error);
            process.exit(1);
        }
    }
}
// Create and run the server
const server = new OperaOmniaMcpServer();
server.run().catch(console.error);
//# sourceMappingURL=index.js.map