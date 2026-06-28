import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import productsCrops from "@/assets/cropfarming.png";
import productsLivestock from "@/assets/livestockfarming.png";
import productsagrochemicals from "@/assets/agrochemicals.png";
import heroFarm from "@/assets/hero-farm.jpg";
import { Wheat, Fish, Beaker, Truck, Users, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import StickyLeadCapture from "@/components/StickyLeadCapture";

const WHATSAPP_NUMBER = "2348149196557";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello MEE FARMS! I'm interested in your Outgrower Program. Please share more details. I will be interested to get the full details as to what it will require to join the outgrower program"
);
 
const categories = [
  {
    title: "Crop Farming",
    Icon: Wheat,
    image: productsCrops,
    description: "Premium agricultural produce grown using sustainable farming practices.",
    products: ["Rice", "Maize", "Cassava", "Plantain", "Beans", "Yam", "Soya Beans", "Tomatoes", "Ginger"],
    features: ["Organic certification available", "Year-round availability", "Bulk and retail quantities", "Direct from farm freshness"],
  },
  {
    title: "Livestock Farming",
    Icon: Fish,
    image: productsLivestock,
    description: "High-quality livestock raised with modern animal husbandry practices.",
    products: ["Chicken", "Guinea Fowl", "Catfish", "Goat", "Sheep", "Cattle", "Pig"],
    features: ["Free-range and farm-raised options", "Veterinary health certification", "Processing and packaging services", "Live and processed products"],
  },
  {
    title: "Agro-Chemicals",
    Icon: Beaker,
    image: productsagrochemicals,
    description: "Essential agricultural inputs to maximize crop yield and quality.",
    products: ["Fertilizers", "Herbicides", "Fungicides", "Insecticides", "Bird Repellents"],
    features: ["Tested and approved products", "Expert application guidance", "Bulk purchasing discounts", "Technical support included"],
  },
];

const services = [
  { Icon: Truck, title: "Logistics Support", description: "End-to-end logistics solutions for agricultural products" },
  { Icon: Users, title: "Outgrower Programs", description: "Farmer empowerment through training and market access" },
  { Icon: Globe, title: "Export Channels", description: "International market access for premium products" },
];

const CategoryRow = ({ cat, index }: { cat: typeof categories[0]; index: number }) => {
  const ref = useReveal();
  const isReversed = index % 2 === 1;
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col lg:flex-row items-center gap-14 ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="lg:w-1/2">
        {cat.image ? (
          <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl group">
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        ) : (
          <div className="rounded-2xl aspect-video bg-gradient-to-br from-primary/15 to-muted flex items-center justify-center shadow-2xl border border-border">
            <div className="text-center">
              <span className="text-7xl">🧪</span>
              <p className="font-heading font-bold text-foreground mt-4">{cat.title}</p>
            </div>
          </div>
        )}
      </div>
      <div className="lg:w-1/2 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <cat.Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-primary/70 uppercase tracking-widest">0{index + 1}</div>
            <h2 className="font-heading text-3xl font-black text-foreground">{cat.title}</h2>
          </div>
        </div>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">{cat.description}</p>
        <div>
          <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wide mb-3">Products Available</h3>
          <div className="flex flex-wrap gap-2">
            {cat.products.map((p, j) => (
              <Badge key={j} className="bg-primary/8 text-primary hover:bg-primary/15 border-0 font-medium">{p}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          {cat.features.map((f, j) => (
            <div key={j} className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-body text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
        <Button size="lg" className="bg-primary hover:bg-primary-darker text-white font-semibold gap-2" asChild>
          <Link to="/shop">Shop Now <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
};

const Products = () => {
  const servicesRef = useReveal();
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroFarm} alt="" className="w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-farm-dark/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            Products & Services
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Our <span className="text-secondary">Products</span> & Services
          </h1>
          <p className="font-body text-xl text-white/70 max-w-2xl mx-auto">
            Comprehensive agricultural solutions from farm to table, supporting Nigeria's food security.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {categories.map((cat, i) => (
              <CategoryRow key={i} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="reveal py-24 bg-farm-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              Value-Added Services
            </div>
            <h2 className="font-heading text-4xl font-black text-white mb-4">Our Services</h2>
            <p className="font-body text-xl text-white/60 max-w-2xl mx-auto">
              Beyond products, we offer comprehensive agricultural services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <div key={i} className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-white/8 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-secondary/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/25 transition-colors">
                  <s.Icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="font-body text-white/55 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold gap-2">
                Join Outgrower Program <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <StickyLeadCapture />
    </div>
  );
};

export default Products;
