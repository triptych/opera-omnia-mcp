// Simplified MCP SDK interfaces for our implementation

// Basic MCP types
export interface McpError extends Error {
  code: ErrorCode;
  message: string;
}

export enum ErrorCode {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
}

// Server interfaces
export interface ServerInfo {
  name: string;
  version: string;
}

export interface ServerCapabilities {
  capabilities: {
    resources: Record<string, unknown>;
    tools: Record<string, unknown>;
  };
}

export interface ServerTransport {
  onMessage: (handler: (message: string) => Promise<string | null>) => void;
  send: (message: string) => Promise<void>;
  close: () => Promise<void>;
}

// Request schemas and parameter types
export const ListResourcesRequestSchema = 'list_resources';
export const ListResourceTemplatesRequestSchema = 'list_resource_templates';

export const ReadResourceRequestSchema = 'read_resource';
export interface ReadResourceParams {
  uri: string;
}

export const ListToolsRequestSchema = 'list_tools';

export const CallToolRequestSchema = 'call_tool';
export interface CallToolParams {
  name: string;
  arguments: Record<string, unknown>;
}

export interface CallToolResponse {
  content: {
    type: string;
    text: string;
  }[];
  isError?: boolean;
}

// Request and response types
export interface Request<T = unknown> {
  id: string;
  method: string;
  params: T;
}

export interface Response<T = unknown> {
  id: string;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

// Resource types
export interface Resource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ResourceTemplate {
  uriTemplate: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ResourceContent {
  uri: string;
  mimeType?: string;
  text: string;
}

export interface ListResourcesResponse {
  resources: Resource[];
}

export interface ListResourceTemplatesResponse {
  resourceTemplates: ResourceTemplate[];
}

export interface ReadResourceResponse {
  contents: ResourceContent[];
}

// Tool types
export interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface ListToolsResponse {
  tools: Tool[];
}

export interface CallToolResponse {
  content: {
    type: string;
    text: string;
  }[];
  isError?: boolean;
}

// Server implementation
export class Server {
  private handlers: Map<string, (request: Request) => Promise<unknown>> = new Map();
  public onerror: (error: Error) => void = console.error;

  constructor(
    private info: ServerInfo,
    private capabilities: ServerCapabilities
  ) {}

  async connect(transport: ServerTransport): Promise<void> {
    transport.onMessage(async (message) => {
      try {
        const request = JSON.parse(message) as Request;
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
        } catch (error) {
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
      } catch (error) {
        this.onerror(error instanceof Error ? error : new Error(String(error)));
        return null;
      }
    });
  }

  setRequestHandler<T, R>(method: string, handler: (request: Request<T>) => Promise<R>): void {
    this.handlers.set(method, handler as (request: Request) => Promise<unknown>);
  }

  async close(): Promise<void> {
    // Cleanup resources if needed
  }
}

// StdioServerTransport implementation
export class StdioServerTransport implements ServerTransport {
  private messageHandler: ((message: string) => Promise<string | null>) | null = null;

  constructor() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', this.handleStdinData.bind(this));
  }

  private async handleStdinData(data: string): Promise<void> {
    if (!this.messageHandler) return;

    const lines = data.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const response = await this.messageHandler(line);
        if (response) {
          process.stdout.write(response + '\n');
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    }
  }

  onMessage(handler: (message: string) => Promise<string | null>): void {
    this.messageHandler = handler;
  }

  async send(message: string): Promise<void> {
    process.stdout.write(message + '\n');
  }

  async close(): Promise<void> {
    // No cleanup needed for stdio
  }
}

// Helper function to create an MCP error
export function createMcpError(code: ErrorCode, message: string): McpError {
  const error = new Error(message) as McpError;
  error.code = code;
  return error;
}
