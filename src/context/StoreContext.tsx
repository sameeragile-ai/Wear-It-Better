import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, CartItem, Currency, Toast, MenswearCategory, FragranceCategory } from '../types';
import { CURRENCIES, PRODUCTS } from '../constants';

interface PolicyModalState {
  isOpen: boolean;
  type: 'privacy' | 'terms';
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  cartTotal: number;
  freeShippingProgress: number;
  amountToFreeShipping: number;
  cartBump: boolean;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToBagFromWishlist: (product: Product, size?: string) => void;

  // Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  // Search & Recent searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
  isFittingModalOpen: boolean;
  setIsFittingModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  policyModal: PolicyModalState;
  openPolicyModal: (type: 'privacy' | 'terms') => void;
  closePolicyModal: () => void;

  // Filters
  menswearFilter: MenswearCategory;
  setMenswearFilter: (filter: MenswearCategory) => void;
  fragranceFilter: FragranceCategory;
  setFragranceFilter: (filter: FragranceCategory) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'undo', action?: { label: string; onClick: () => void }) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'wib_cart_v1',
  WISHLIST: 'wib_wishlist_v1',
  CURRENCY: 'wib_currency_v1',
  SEARCHES: 'wib_recent_searches_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency persisted
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (saved && CURRENCIES[saved as Currency['code']]) {
        return CURRENCIES[saved as Currency['code']];
      }
    } catch {}
    return CURRENCIES.USD;
  });

  // Recent searches persisted
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEARCHES);
      return saved ? JSON.parse(saved) : ['Oud', 'Kurta', 'Waistcoat', 'Dark Elixir'];
    } catch {
      return ['Oud', 'Kurta', 'Waistcoat', 'Dark Elixir'];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isFittingModalOpen, setIsFittingModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [policyModal, setPolicyModal] = useState<PolicyModalState>({ isOpen: false, type: 'privacy' });

  // Filters
  const [menswearFilter, setMenswearFilter] = useState<MenswearCategory>('all');
  const [fragranceFilter, setFragranceFilter] = useState<FragranceCategory>('all');

  // Animation bump for cart badge
  const [cartBump, setCartBump] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, currency.code);
    } catch {}
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCHES, JSON.stringify(recentSearches));
    } catch {}
  }, [recentSearches]);

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'undo' = 'success', action?: { label: string; onClick: () => void }) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type, action };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerCartBump = useCallback(() => {
    setCartBump(true);
    setTimeout(() => setCartBump(false), 700);
  }, []);

  const addToCart = useCallback((product: Product, size: string, quantity: number = 1) => {
    // If fragrance 100ml size, add $60 to base price
    let effectivePrice = product.price;
    if (product.department === 'fragrance' && size.includes('100ml')) {
      effectivePrice = product.price + 60;
    }

    const itemKey = `${product.id}__${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          productId: product.id,
          name: product.name,
          price: effectivePrice,
          size,
          quantity,
          image: product.image,
          department: product.department,
        };
        return [...prevCart, newItem];
      }
    });

    triggerCartBump();

    addToast(`Added "${product.name}" (${size}) to bag`, 'success', {
      label: 'View bag',
      onClick: () => setIsCartOpen(true),
    });
  }, [addToast, triggerCartBump]);

  const removeFromCart = useCallback((cartItemId: string) => {
    let removedItem: CartItem | undefined;
    setCart((prev) => {
      removedItem = prev.find((item) => item.id === cartItemId);
      return prev.filter((item) => item.id !== cartItemId);
    });

    if (removedItem) {
      const itemToRestore = removedItem;
      addToast(`Removed "${itemToRestore.name}" from bag`, 'undo', {
        label: 'Undo',
        onClick: () => {
          setCart((prev) => [...prev, itemToRestore]);
          triggerCartBump();
        },
      });
    }
  }, [addToast, triggerCartBump]);

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Added "${product.name}" to wishlist`, 'success', {
          label: 'View wishlist',
          onClick: () => setIsWishlistOpen(true),
        });
        return [...prev, product.id];
      }
    });
  }, [addToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const moveToBagFromWishlist = useCallback((product: Product, size?: string) => {
    const chosenSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    addToCart(product, chosenSize, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  }, [addToCart]);

  // Searches
  const addRecentSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 8);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Policy Modal
  const openPolicyModal = useCallback((type: 'privacy' | 'terms') => {
    setPolicyModal({ isOpen: true, type });
  }, []);

  const closePolicyModal = useCallback(() => {
    setPolicyModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Complimentary worldwide express shipping over $250, else $15
  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return cartSubtotal >= 250 ? 0 : 15;
  }, [cartSubtotal, cart.length]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + shippingCost;
  }, [cartSubtotal, shippingCost]);

  const freeShippingThreshold = 250;
  const amountToFreeShipping = Math.max(freeShippingThreshold - cartSubtotal, 0);
  const freeShippingProgress = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);

  // Currency Formatter
  const formatPrice = useCallback((amountInUSD: number): string => {
    const converted = amountInUSD * currency.rate;
    const isPKR = currency.code === 'PKR';

    return `${currency.symbol}${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: isPKR ? 0 : 0,
      maximumFractionDigits: isPKR ? 0 : 0,
    }).format(Math.round(converted))}`;
  }, [currency]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingProgress,
    amountToFreeShipping,
    cartBump,
    wishlist,
    toggleWishlist,
    isInWishlist,
    moveToBagFromWishlist,
    currency,
    setCurrency,
    formatPrice,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isSearchOpen,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSignInOpen,
    setIsSignInOpen,
    isFittingModalOpen,
    setIsFittingModalOpen,
    quickViewProduct,
    setQuickViewProduct,
    policyModal,
    openPolicyModal,
    closePolicyModal,
    menswearFilter,
    setMenswearFilter,
    fragranceFilter,
    setFragranceFilter,
    toasts,
    addToast,
    removeToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
