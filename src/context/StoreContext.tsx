import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";
import type { PropsWithChildren } from "react";
import type { CartItem, Category, Product, StoreSettings } from "../types";
import { fetchPublicCatalog } from "../services/storeService";
import { DEFAULT_STORE_SETTINGS } from "../lib/defaultData";

interface StoreContextValue {
  categories: Category[];
  products: Product[];
  settings: StoreSettings;
  loading: boolean;
  error: string | null;
  reloadCatalog: () => Promise<void>;
  cartItems: CartItem[];
  cartQuantity: number;
  subtotal: number;
  total: number;
  addToCart: (item: Omit<CartItem, "lineId">) => void;
  updateCartItemQuantity: (lineId: string, quantity: number) => void;
  removeCartItem: (lineId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function makeLineId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const reloadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicCatalog();
      setCategories(data.categories);
      setProducts(data.products);
      setSettings(data.settings);
    } catch {
      setError("Não foi possível carregar o cardápio no momento.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadCatalog();
  }, [reloadCatalog]);

  const addToCart = useCallback((item: Omit<CartItem, "lineId">) => {
    setCartItems((previous) => [...previous, { ...item, lineId: makeLineId() }]);
  }, []);

  const updateCartItemQuantity = useCallback((lineId: string, quantity: number) => {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item.lineId === lineId
            ? {
                ...item,
                quantity,
                totalPrice: item.unitPrice * quantity
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeCartItem = useCallback((lineId: string) => {
    setCartItems((previous) => previous.filter((item) => item.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    [cartItems]
  );
  const total = subtotal;
  const cartQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      categories,
      products,
      settings,
      loading,
      error,
      reloadCatalog,
      cartItems,
      cartQuantity,
      subtotal,
      total,
      addToCart,
      updateCartItemQuantity,
      removeCartItem,
      clearCart
    }),
    [
      categories,
      products,
      settings,
      loading,
      error,
      reloadCatalog,
      cartItems,
      cartQuantity,
      subtotal,
      total,
      addToCart,
      updateCartItemQuantity,
      removeCartItem,
      clearCart
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de StoreProvider.");
  }
  return context;
}
