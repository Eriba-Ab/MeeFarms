import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getStatusBadge = () => {
    switch (product.status) {
      case 'in-stock':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">In Stock</Badge>;
      case 'low-stock':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  const handleAddToCart = () => {
    if (product.status !== 'out-of-stock') {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
      </Button>

      {/* Product Image */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView?.(product)}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer"
              onClick={() => onQuickView?.(product)}>
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
          {getStatusBadge()}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.status === 'out-of-stock'}
          className="w-full group-hover:bg-primary-darker transition-colors"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}