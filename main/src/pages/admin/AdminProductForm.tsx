import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/useProducts';
import api from '@/lib/api';
import { uploadImage } from '@/lib/upload';
import { getImageUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

const categories = [
    { value: 'crops', label: 'Crops' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'agro-chemicals', label: 'Agro-Chemicals' }
];

export default function AdminProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const { data: product, isLoading: isLoadingProduct } = useProduct(id || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [imageInputMethod, setImageInputMethod] = useState<'upload' | 'url'>('upload');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        longDescription: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                longDescription: product.longDescription || '',
                price: product.price.toString(),
                category: product.category,
                stock: product.stock.toString(),
                image: product.image
            });
            setImagePreview(getImageUrl(product.image));
        }
    }, [product]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (url: string) => {
        setFormData({ ...formData, image: url });
        setImagePreview(url);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imagePath = formData.image;

            // Upload image if file is selected
            if (imageFile && imageInputMethod === 'upload') {
                setIsUploading(true);
                try {
                    imagePath = await uploadImage(imageFile);
                    toast.success('Image uploaded successfully');
                } catch (error: any) {
                    toast.error(error.message);
                    setIsSubmitting(false);
                    setIsUploading(false);
                    return;
                } finally {
                    setIsUploading(false);
                }
            }

            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                image: imagePath
            };

            if (isEditing) {
                await api.put(`/products/${id}`, payload);
                toast.success('Product updated successfully');
            } else {
                await api.post('/products', payload);
                toast.success('Product created successfully');
            }
            navigate('/admin/products');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing && isLoadingProduct) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Button variant="ghost" className="mb-6" onClick={() => navigate('/admin/products')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                required
                                rows={2}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description for product cards"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="longDescription">Long Description</Label>
                            <Textarea
                                id="longDescription"
                                required
                                rows={4}
                                value={formData.longDescription}
                                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                placeholder="Detailed description for product page"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₦)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Product Image</Label>
                            <Tabs value={imageInputMethod} onValueChange={(v) => setImageInputMethod(v as 'upload' | 'url')}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="upload">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Image
                                    </TabsTrigger>
                                    <TabsTrigger value="url">
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Image URL
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="upload" className="space-y-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required={!isEditing && !formData.image}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Upload an image file (max 5MB, jpg/png/webp)
                                    </p>
                                </TabsContent>
                                <TabsContent value="url" className="space-y-2">
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image}
                                        onChange={(e) => handleImageUrlChange(e.target.value)}
                                        required={!imageFile}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Or provide a direct URL to the image
                                    </p>
                                </TabsContent>
                            </Tabs>

                            {imagePreview && (
                                <div className="mt-4 h-48 w-full bg-muted rounded-md overflow-hidden border">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading Image...
                                </>
                            ) : isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Product'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
