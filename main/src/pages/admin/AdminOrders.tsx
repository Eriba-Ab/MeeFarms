import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { OrderDetailsDialog } from '@/components/OrderDetailsDialog';

interface Order {
    _id: string;
    orderNumber: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
    };
    items: Array<{
        product: any;
        quantity: number;
        price: number;
    }>;
    total: number;
    paymentMethod: 'cash' | 'transfer';
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminOrders() {
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const queryClient = useQueryClient();

    const { data: orders, isLoading } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: async () => {
            const response = await api.get('/orders');
            return response.data as Order[];
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
            const response = await api.put(`/orders/${orderId}/status`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
            toast.success('Order status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update order status');
        }
    });

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

    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };

    const filteredOrders = orders?.filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesSearch = searchQuery === '' ||
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerInfo.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Orders</h1>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                        {filteredOrders?.length || 0} Orders
                    </Badge>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by order #, customer name, or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Orders</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <div className="bg-background rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders?.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{order.customerInfo.name}</div>
                                                <div className="text-sm text-muted-foreground">{order.customerInfo.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{order.items.length} item(s)</TableCell>
                                        <TableCell className="font-semibold">₦{order.total.toLocaleString()}</TableCell>
                                        <TableCell className="capitalize">{order.paymentMethod}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={order.status}
                                                onValueChange={(value) => handleStatusChange(order._id, value)}
                                            >
                                                <SelectTrigger className="w-[140px]">
                                                    {getStatusBadge(order.status)}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="processing">Processing</SelectItem>
                                                    <SelectItem value="shipped">Shipped</SelectItem>
                                                    <SelectItem value="delivered">Delivered</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Order Details Dialog */}
            <OrderDetailsDialog
                order={selectedOrder}
                open={!!selectedOrder}
                onOpenChange={(open) => !open && setSelectedOrder(null)}
            />
        </>
    );
}
