import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCheckout: () => void;
}

export function CartSheet({ open, onOpenChange, onCheckout }: CartSheetProps) {
    const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

    const handleCheckout = () => {
        onOpenChange(false);
        onCheckout();
    };

    if (items.length === 0) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                        <p className="text-muted-foreground mb-6">
                            Add some products to get started!
                        </p>
                        <Button onClick={() => onOpenChange(false)}>
                            Continue Shopping
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</SheetTitle>
                </SheetHeader>

                {/* Cart Items - Scrollable */}
                <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
                    <div className="space-y-4">
                        {items.map((item) => {
                            const productId = item.product._id || item.product.id || '';
                            return (
                                <div key={productId} className="flex gap-4 py-4 border-b">
                                    {/* Product Image */}
                                    <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                        <img
                                            src={getImageUrl(item.product.image)}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm mb-1 truncate">
                                            {item.product.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            ₦{item.product.price.toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(productId, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(productId, item.quantity + 1)}
                                                disabled={item.quantity >= item.product.stock}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Price and Remove */}
                                    <div className="flex flex-col items-end justify-between">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                            onClick={() => removeFromCart(productId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <p className="font-semibold text-sm">
                                            ₦{(item.product.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer with Total and Checkout */}
                <SheetFooter className="flex-col gap-4 sm:flex-col">
                    <Separator />
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-primary">₦{total.toLocaleString()}</span>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            className="w-full"
                            size="lg"
                        >
                            Proceed to Checkout
                        </Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            variant="outline"
                            className="w-full"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
