import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        phone: ''
    });

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const orderItems = items.map(item => ({
                product: item.product._id || item.product.id,
                quantity: item.quantity,
                price: item.product.price
            }));

            const payload = {
                items: orderItems,
                totalAmount: total,
                shippingAddress: formData,
                user: user?._id
            };

            await api.post('/orders', payload);

            toast.success('Order placed successfully!');
            clearCart();
            navigate('/order-success');
        } catch (error: any) {
            console.error('Checkout error:', error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.product._id || item.product.id} className="flex justify-between text-sm">
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>₦{(item.product.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t pt-4 font-bold flex justify-between text-lg">
                                <span>Total</span>
                                <span>₦{total.toLocaleString()}</span>
                            </div>

                            <div className="pt-4">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </Button>
                                <p className="mt-4 text-xs text-center text-muted-foreground">
                                    By placing this order, you agree to our Terms of Service.
                                    Payment is cash on delivery or bank transfer upon confirmation.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
