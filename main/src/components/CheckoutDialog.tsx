import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/lib/utils';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CheckoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
    const { items, total, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        paymentMethod: 'cash',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                customerInfo: {
                    name: formData.customerName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state
                },
                items: items.map(item => ({
                    product: item.product._id || item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                total,
                paymentMethod: formData.paymentMethod,
                notes: formData.notes
            };

            const response = await api.post('/orders', orderData);
            setOrderNumber(response.data.orderNumber || response.data._id);
            setOrderSuccess(true);
            clearCart();
            toast.success('Order placed successfully!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setOrderSuccess(false);
            setFormData({
                customerName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                paymentMethod: 'cash',
                notes: ''
            });
        }, 300);
    };

    if (orderSuccess) {
        return (
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle2 className="h-16 w-16 text-success mb-4" />
                        <DialogTitle className="text-2xl mb-2">Order Placed Successfully!</DialogTitle>
                        <DialogDescription className="text-base mb-6">
                            Your order has been received and is being processed.
                        </DialogDescription>
                        <div className="bg-muted p-4 rounded-lg mb-6 w-full">
                            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                            <p className="text-lg font-semibold">{orderNumber}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            We'll send you a confirmation email shortly.
                        </p>
                        <Button onClick={handleClose} className="w-full">
                            Continue Shopping
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Complete your order by filling in your details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Customer Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="customerName">Full Name *</Label>
                                <Input
                                    id="customerName"
                                    required
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+234 800 000 0000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Delivery Address *</Label>
                            <Textarea
                                id="address"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Street address, apartment, suite, etc."
                                rows={2}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder="Lagos"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State *</Label>
                                <Input
                                    id="state"
                                    required
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    placeholder="Lagos State"
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Payment Method</h3>
                        <RadioGroup
                            value={formData.paymentMethod}
                            onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        >
                            <div className="flex items-center space-x-2 border rounded-lg p-4">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Cash on Delivery</div>
                                    <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-4">
                                <RadioGroupItem value="transfer" id="transfer" />
                                <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Bank Transfer</div>
                                    <div className="text-sm text-muted-foreground">Transfer to our bank account</div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Separator />

                    {/* Order Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Order Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any special instructions for your order?"
                            rows={3}
                        />
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <div className="space-y-2">
                            {items.map((item) => (
                                <div key={item.product._id || item.product.id} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {item.product.name} × {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        ₦{(item.product.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-primary">₦{total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Placing Order...
                            </>
                        ) : (
                            `Place Order - ₦${total.toLocaleString()}`
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
