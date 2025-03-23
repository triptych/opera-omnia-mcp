export interface McpError extends Error {
    code: ErrorCode;
    message: string;
}
export declare enum ErrorCode {
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603
}
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
export declare const ListResourcesRequestSchema = "list_resources";
export declare const ListResourceTemplatesRequestSchema = "list_resource_templates";
export declare const ReadResourceRequestSchema = "read_resource";
export interface ReadResourceParams {
    uri: string;
}
export declare const ListToolsRequestSchema = "list_tools";
export declare const CallToolRequestSchema = "call_tool";
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
export declare class Server {
    private info;
    private capabilities;
    private handlers;
    onerror: (error: Error) => void;
    constructor(info: ServerInfo, capabilities: ServerCapabilities);
    connect(transport: ServerTransport): Promise<void>;
    setRequestHandler<T, R>(method: string, handler: (request: Request<T>) => Promise<R>): void;
    close(): Promise<void>;
}
export declare class StdioServerTransport implements ServerTransport {
    private messageHandler;
    constructor();
    private handleStdinData;
    onMessage(handler: (message: string) => Promise<string | null>): void;
    send(message: string): Promise<void>;
    close(): Promise<void>;
}
export declare function createMcpError(code: ErrorCode, message: string): McpError;
