export type Department = 'menswear' | 'fragrance';

export type MenswearCategory = 'all' | 'kurtas' | 'suits' | 'kameez';
export type FragranceCategory = 'all' | 'him' | 'her' | 'unisex';

export interface Product {
  id: string;
  name: string;
  price: number; // In USD
  department: Department;
  category: string; // e.g., 'Kurtas & Waistcoats', 'Suits & Jackets', 'Kameez Shalwar', 'For Him', 'For Her', 'Unisex'
  categoryKey: string; // e.g. 'kurtas', 'suits', 'kameez', 'him', 'her', 'unisex'
  badge?: string; // 'New arrival', 'Intense', 'Almost gone', etc.
  rating: number;
  reviewCount: number;
  description: string;
  fabricOrNotes: string; // Brief one-line breakdown
  notes?: string[]; // Scent notes for perfumes, tailoring specs for menswear
  image: string;
  secondaryImage?: string;
  sizes: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string; // Combination of productId and size
  productId: string;
  name: string;
  price: number; // Base USD unit price
  size: string;
  quantity: number;
  image: string;
  department: Department;
}

export interface Currency {
  code: 'USD' | 'GBP' | 'EUR' | 'PKR';
  symbol: string;
  rate: number;
  label: string;
}

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'undo';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  productPurchased: string;
  rating: number;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BespokeStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}
