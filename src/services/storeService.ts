import {
  DEFAULT_CATEGORIES,
  DEFAULT_PRODUCTS,
  DEFAULT_STORE_SETTINGS
} from "../lib/defaultData";
import type { Category, Product, StoreSettings } from "../types";

interface PublicCatalogResponse {
  categories: Category[];
  products: Product[];
  settings: StoreSettings;
}

export async function fetchPublicCatalog(): Promise<PublicCatalogResponse> {
  return {
    categories: DEFAULT_CATEGORIES,
    products: DEFAULT_PRODUCTS,
    settings: DEFAULT_STORE_SETTINGS
  };
}
