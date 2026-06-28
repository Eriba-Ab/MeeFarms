import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import productsCrops from "@/assets/cropfarming.png";
import productsLivestock from "@/assets/livestockfarming.png";
import productsAgroChemicals from "@/assets/agrochemicals.png";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const categories = [
  {
    num: "01",
    title: "Crop Farming",
    description: "Premium agricultural produce grown using sustainable farming practices, from rice and maize to cassava, tomatoes, and ginger.",
    image: productsCrops,
    items: ["Rice", "Maize", "Cassava", "Tomatoes", "Beans", "Yam"],
  },
  {
    num: "02",
    title: "Livestock Farming",
    description: "High-quality livestock raised with modern animal husbandry practices including chicken, guinea fowl, catfish, goat, and cattle.",
    image: productsLivestock,
    items: ["Chicken", "Catfish", "Goat", "Cattle", "Guinea Fowl"],
  },
  {
    num: "03",
    title: "Agro-Chemicals",
    description: "Essential agricultural inputs to maximize crop yield and quality — tested, approved, and backed by expert guidance.",
    image: productsAgroChemicals,
    items: ["Fertilizers", "Herbicides", "Fungicides", "Insecticides"],
  },
];

const CategoryCard = ({ cat, delay }: { cat: typeof categories[0]; delay: number }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border hover:border-primary/20"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-52 overflow-hidden relative bg-gradient-to-br from-primary/15 to-muted">
        {cat.image ? (
          <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🧪</span>
          </div>
        )}
        <div className="absolute top-4 left-4 font-heading font-black text-5xl text-white/15 leading-none select-none">
          {cat.num}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {cat.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
        <div className="flex flex-wrap gap-2">
          {cat.items.map((item, j) => (
            <span key={j} className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="h-3 w-3" />{item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const titleRef = useReveal();
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            What MEE FARMS Offers
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-foreground mb-4">
            What Our Agricultural<br />
            <span className="text-primary">Company Offers</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            From farm to table, we provide premium agricultural products that nourish communities and support sustainable farming.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {categories.map((cat, i) => (
            <CategoryCard key={i} cat={cat} delay={i * 80} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary-darker text-white font-semibold px-8 gap-2" asChild>
            <Link to="/shop">
              Shop All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
