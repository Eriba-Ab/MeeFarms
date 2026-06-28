import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getImageUrl } from '@/lib/utils';
import { Package, User, MapPin, CreditCard, FileText, Calendar } from 'lucide-react';

interface OrderDetailsDialogProps {
    order: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange }: OrderDetailsDialogProps) {
    if (!order) return null;

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; className: string }> = {
            pending: { variant: 'secondary', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
            processing: { variant: 'secondary', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
            shipped: { variant: 'secondary', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
            delivered: { variant: 'secondary', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
            cancelled: { variant: 'destructive', className: '' }
        };

        const config = variants[status] || variants.pending;
        return (
            <Badge variant={config.variant} className={config.className}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Order Details</DialogTitle>
                        {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Order #{order.orderNumber}
                    </p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Customer Information */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">Customer Information</h3>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">{order.customerInfo.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{order.customerInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{order.customerInfo.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Delivery Address */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">Delivery Address</h3>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                            <p>{order.customerInfo.address}</p>
                            <p>{order.customerInfo.city}, {order.customerInfo.state}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">Order Items ({order.items.length})</h3>
                        </div>
                        <div className="space-y-3">
                            {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                                    <div className="h-16 w-16 rounded-md overflow-hidden bg-background flex-shrink-0">
                                        {item.product?.image ? (
                                            <img
                                                src={getImageUrl(item.product.image)}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <Package className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product?.name || 'Product'}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Quantity: {item.quantity} × ₦{item.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ₦{(item.quantity * item.price).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Payment & Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                <h3 className="font-semibold">Payment Method</h3>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4">
                                <p className="capitalize">{order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                            </div>
                        </div>

                        {order.notes && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <h3 className="font-semibold">Order Notes</h3>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm">{order.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div>
                        <h3 className="font-semibold mb-3">Order Summary</h3>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₦{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Delivery Fee</span>
                                <span>₦0</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-primary">₦{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
