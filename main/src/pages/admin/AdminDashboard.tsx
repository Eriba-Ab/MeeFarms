import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    // Mock data, these stats will be fetched from the backend upon implementation
    const stats = [
        { title: 'Total Revenue', value: '₦0', icon: DollarSign, color: 'text-green-500' },
        { title: 'Orders', value: '0', icon: ShoppingBag, color: 'text-blue-500' },
        { title: 'Products', value: '12', icon: Package, color: 'text-orange-500' },
        { title: 'Customers', value: '0', icon: Users, color: 'text-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    +0% from last month
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
