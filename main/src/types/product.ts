export interface Product {
export interface Product {
  _id: string;
  id?: string;
  name: string;
  price: number;
  image: string;
  category: 'crops' | 'livestock' | 'agro-chemicals';
  stock: number;
  description: string;
  longDescription: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}