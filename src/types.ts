// Type definitions for Opera Omnia MCP server

// Basic dataset structure from Opera Omnia
export interface DatasetItem {
  description: string;
  items: string[];
}

// Structure for manifest.json
export interface Manifest {
  name: string;
  description: string;
  version: string;
  lastUpdated: string;
  categories: Category[];
}

export interface Category {
  name: string;
  description: string;
  datasets: Dataset[];
}

export interface Dataset {
  name: string;
  description: string;
  path: string;
}

// Input/output types for MCP tools
export interface CategoryListOutput {
  categories: {
    name: string;
    description: string;
  }[];
}

export interface DatasetListInput {
  category: string;
}

export interface DatasetListOutput {
  datasets: {
    name: string;
    description: string;
  }[];
}

export interface GetDatasetInput {
  category: string;
  dataset: string;
}

export interface GetRandomItemInput {
  category: string;
  dataset: string;
}

export interface GetFilteredItemsInput {
  category: string;
  dataset: string;
  filter: string;
}

export interface CombineDatasetsInput {
  datasets: {
    category: string;
    dataset: string;
  }[];
  count?: number;
}

export interface GenerateContentInput {
  template: string;
  datasets: {
    [key: string]: {
      category: string;
      dataset: string;
    };
  };
}

// Cache structure
export interface CacheData {
  manifest?: Manifest;
  datasets: {
    [category: string]: {
      [dataset: string]: DatasetItem;
    };
  };
}
