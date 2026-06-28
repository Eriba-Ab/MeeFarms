import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroFarm from "@/assets/hero-farm.jpg";
import productsLivestock from "@/assets/products-livestock.jpg";
import productsCrops from "@/assets/products-crops.jpg";

const WHATSAPP_NUMBER = "2348149196557";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello MEE FARMS! I'm interested in your Outgrower Program. Please share more details about how I can participate."
);

const CTABanner = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <>
      {/* From Seed to Harvest – image grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                <img src={heroFarm} alt="Farm harvest" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg flex-1">
                  <img src={productsCrops} alt="Crops" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video shadow-lg">
                  <img src={productsLivestock} alt="Livestock" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-foreground/80 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
                  🌱 From Seed to Harvest
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl font-black text-foreground leading-tight mb-5">
                  Partner with us to grow<br />
                  Nigeria's{" "}
                  <span className="text-primary">agriculture future.</span>
                </h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  Join our mission to transform agriculture in Nigeria. Whether you're a farmer, investor, or consumer, there's a place for you in our growing community.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: "150+", l: "Farmers Empowered" },
                  { v: "400+", l: "Hectares Cultivated" },
                  { v: "10+", l: "Communities Served" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 bg-muted/60 rounded-xl">
                    <div className="font-heading text-2xl font-black text-primary">{s.v}</div>
                    <div className="font-body text-xs text-muted-foreground mt-1 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-darker text-white font-semibold px-7"
                  asChild
                >
                  <Link to="/shop">Shop Products</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5 font-semibold px-7"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Join Outgrower Program
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTABanner;
