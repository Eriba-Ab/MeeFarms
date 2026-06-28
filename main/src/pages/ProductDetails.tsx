import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useProduct } from '@/hooks/useProducts';
import { getImageUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading, error } = useProduct(id || '');

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-xl text-muted-foreground">Product not found</p>
                <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${quantity} × ${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <Button
                    variant="ghost"
                    className="mb-8"
                    onClick={() => navigate('/shop')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Shop
                </Button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="rounded-lg overflow-hidden bg-muted aspect-square relative">
                        <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-6">
                            <Badge className="mb-4 capitalize">{product.category}</Badge>
                            <h1 className="text-4xl font-heading font-bold mb-2">{product.name}</h1>
                            <p className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</p>
                        </div>

                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            {product.longDescription || product.description}
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <Button
                            size="lg"
                            className="w-full md:w-auto min-w-[200px]"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
