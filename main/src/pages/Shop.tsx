import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';
import { Search, Filter, ShoppingCart, Loader2, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';
import heroFarm from '@/assets/hero-farm.jpg';
import StickyLeadCapture from '@/components/StickyLeadCapture';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'crops', label: 'Crops' },
  { value: 'livestock', label: 'Livestock' },
  { value: 'agro-chemicals', label: 'Agro-Chemicals' },
];

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low-High)' },
  { value: 'price-desc', label: 'Price (High-Low)' },
  { value: 'stock-desc', label: 'In Stock First' },
];

export default function Shop() {
  const { itemCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: products = [], isLoading, error } = useProducts({
    category: selectedCategory,
    search: searchTerm,
    sort: sortBy,
  });

  const handleQuickView = (product: Product) => {
    window.location.href = `/shop/${product._id || product.id}`;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name-asc');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroFarm} alt="" className="w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-farm-dark/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            Fresh From the Farm
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl font-black text-white mb-4">
            Shop <span className="text-secondary">MEE FARMS</span>
          </h1>
          <p className="text-xl text-white/70 font-body mb-8 max-w-lg mx-auto">
            Buy fresh farm produce, livestock products, and high-quality agro-chemicals.
          </p>
          <div className="inline-flex items-center gap-3">
            <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              onClick={() => {}}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({itemCount})
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-64 shrink-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-20 shadow-sm">
              <h3 className="font-heading font-bold text-foreground mb-5 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" /> Filters
              </h3>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-muted/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full text-sm" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1.5" /> Filters
                </Button>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Loading...' : `${products.length} products`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 text-sm bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-body">Loading fresh products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 rounded-2xl bg-card border border-border">
                <p className="text-destructive font-semibold mb-2">Failed to load products</p>
                <p className="text-muted-foreground text-sm">Please try again later.</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} onQuickView={handleQuickView} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl bg-card border border-dashed border-border">
                <ShoppingCart className="h-14 w-14 mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6 font-body">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <StickyLeadCapture />
    </div>
  );
}
