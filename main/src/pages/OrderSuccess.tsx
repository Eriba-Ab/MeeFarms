import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
            <div className="mb-8">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div className="flex gap-4">
                <Button size="lg" onClick={() => navigate('/shop')}>
                    Continue Shopping
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
}
