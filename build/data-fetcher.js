import axios from 'axios';
import NodeCache from 'node-cache';
// GitHub repository information
const REPO_OWNER = 'triptych';
const REPO_NAME = 'opera-omnia';
const BRANCH = 'main';
const BASE_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`;
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;
// Cache configuration (TTL in seconds)
const CACHE_TTL = 3600; // 1 hour
export class DataFetcher {
    constructor() {
        this.cache = new NodeCache({ stdTTL: CACHE_TTL });
        this.cacheData = {
            datasets: {}
        };
    }
    /**
     * Initialize the data fetcher by loading the manifest
     */
    async initialize() {
        try {
            await this.getManifest();
            console.error('DataFetcher initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize DataFetcher:', error);
            throw error;
        }
    }
    /**
     * Get the manifest file from GitHub or cache
     */
    async getManifest() {
        // Check cache first
        if (this.cacheData.manifest) {
            return this.cacheData.manifest;
        }
        try {
            const response = await axios.get(`${BASE_URL}/manifest.json`);
            this.cacheData.manifest = response.data;
            return response.data;
        }
        catch (error) {
            console.error('Error fetching manifest:', error);
            throw new Error('Failed to fetch manifest from GitHub');
        }
    }
    /**
     * Get a dataset from GitHub or cache
     */
    async getDataset(category, dataset) {
        // Check cache first
        if (this.cacheData.datasets[category] &&
            this.cacheData.datasets[category][dataset]) {
            return this.cacheData.datasets[category][dataset];
        }
        // Find the dataset path from manifest
        const manifest = await this.getManifest();
        const categoryObj = manifest.categories.find(c => c.name === category);
        if (!categoryObj) {
            throw new Error(`Category not found: ${category}`);
        }
        const datasetObj = categoryObj.datasets.find(d => d.name === dataset);
        if (!datasetObj) {
            throw new Error(`Dataset not found: ${dataset} in category ${category}`);
        }
        try {
            const response = await axios.get(`${BASE_URL}/${datasetObj.path}`);
            // Initialize category in cache if needed
            if (!this.cacheData.datasets[category]) {
                this.cacheData.datasets[category] = {};
            }
            // Store in cache
            this.cacheData.datasets[category][dataset] = response.data;
            return response.data;
        }
        catch (error) {
            console.error(`Error fetching dataset ${category}/${dataset}:`, error);
            throw new Error(`Failed to fetch dataset ${category}/${dataset} from GitHub`);
        }
    }
    /**
     * Get all available categories
     */
    async getCategories() {
        const manifest = await this.getManifest();
        return manifest.categories.map(category => ({
            name: category.name,
            description: category.description
        }));
    }
    /**
     * Get all datasets in a category
     */
    async getDatasetsInCategory(category) {
        const manifest = await this.getManifest();
        const categoryObj = manifest.categories.find(c => c.name === category);
        if (!categoryObj) {
            throw new Error(`Category not found: ${category}`);
        }
        return categoryObj.datasets.map(dataset => ({
            name: dataset.name,
            description: dataset.description
        }));
    }
    /**
     * Clear the cache
     */
    clearCache() {
        this.cacheData = { datasets: {} };
        this.cache.flushAll();
    }
}
//# sourceMappingURL=data-fetcher.js.map