// Simplified MCP SDK interfaces for our implementation
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ParseError"] = -32700] = "ParseError";
    ErrorCode[ErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
    ErrorCode[ErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
    ErrorCode[ErrorCode["InvalidParams"] = -32602] = "InvalidParams";
    ErrorCode[ErrorCode["InternalError"] = -32603] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
// Request schemas and parameter types
export const ListResourcesRequestSchema = 'list_resources';
export const ListResourceTemplatesRequestSchema = 'list_resource_templates';
export const ReadResourceRequestSchema = 'read_resource';
export const ListToolsRequestSchema = 'list_tools';
export const CallToolRequestSchema = 'call_tool';
// Server implementation
export class Server {
    constructor(info, capabilities) {
        this.info = info;
        this.capabilities = capabilities;
        this.handlers = new Map();
        this.onerror = console.error;
    }
    async connect(transport) {
        transport.onMessage(async (message) => {
            try {
                const request = JSON.parse(message);
                const handler = this.handlers.get(request.method);
                if (!handler) {
                    return JSON.stringify({
                        id: request.id,
                        error: {
                            code: ErrorCode.MethodNotFound,
                            message: `Method not found: ${request.method}`,
                        },
                    });
                }
                try {
                    const result = await handler(request);
                    return JSON.stringify({
                        id: request.id,
                        result,
                    });
                }
                catch (error) {
                    if (error instanceof Error) {
                        return JSON.stringify({
                            id: request.id,
                            error: {
                                code: ErrorCode.InternalError,
                                message: error.message,
                            },
                        });
                    }
                    return JSON.stringify({
                        id: request.id,
                        error: {
                            code: ErrorCode.InternalError,
                            message: String(error),
                        },
                    });
                }
            }
            catch (error) {
                this.onerror(error instanceof Error ? error : new Error(String(error)));
                return null;
            }
        });
    }
    setRequestHandler(method, handler) {
        this.handlers.set(method, handler);
    }
    async close() {
        // Cleanup resources if needed
    }
}
// StdioServerTransport implementation
export class StdioServerTransport {
    constructor() {
        this.messageHandler = null;
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', this.handleStdinData.bind(this));
    }
    async handleStdinData(data) {
        if (!this.messageHandler)
            return;
        const lines = data.split('\n');
        for (const line of lines) {
            if (!line.trim())
                continue;
            try {
                const response = await this.messageHandler(line);
                if (response) {
                    process.stdout.write(response + '\n');
                }
            }
            catch (error) {
                console.error('Error handling message:', error);
            }
        }
    }
    onMessage(handler) {
        this.messageHandler = handler;
    }
    async send(message) {
        process.stdout.write(message + '\n');
    }
    async close() {
        // No cleanup needed for stdio
    }
}
// Helper function to create an MCP error
export function createMcpError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
}
//# sourceMappingURL=mcp-sdk.js.map