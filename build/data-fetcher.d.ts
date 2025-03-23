import { DatasetItem, Manifest } from './types.js';
export declare class DataFetcher {
    private cache;
    private cacheData;
    constructor();
    /**
     * Initialize the data fetcher by loading the manifest
     */
    initialize(): Promise<void>;
    /**
     * Get the manifest file from GitHub or cache
     */
    getManifest(): Promise<Manifest>;
    /**
     * Get a dataset from GitHub or cache
     */
    getDataset(category: string, dataset: string): Promise<DatasetItem>;
    /**
     * Get all available categories
     */
    getCategories(): Promise<{
        name: string;
        description: string;
    }[]>;
    /**
     * Get all datasets in a category
     */
    getDatasetsInCategory(category: string): Promise<{
        name: string;
        description: string;
    }[]>;
    /**
     * Clear the cache
     */
    clearCache(): void;
}
