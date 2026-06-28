import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import productsCrops from "@/assets/rice.png";
import logo from "@/assets/logo.png";

const pillars = [
  { num: "01", title: "Crop Farming", desc: "Rice, Maize, Cassava & More" },
  { num: "02", title: "Livestock", desc: "Poultry, Cattle, Fish & More" },
  { num: "03", title: "Agro-Inputs", desc: "Fertilizers, Seeds & Equipment" },
];

const AboutSummary = () => {
  const ref = useReveal();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <div ref={ref} className="reveal relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src={productsCrops}
                alt="MEE FARMS Crop Farming"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-secondary text-secondary-foreground rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-heading font-black text-3xl">6+</div>
              <div className="font-body text-xs font-semibold uppercase tracking-wide">Years Farming</div>
            </div>
            <div className="absolute -top-4 -left-4 w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl"><img src={logo} alt="MEE FARMS" className="w-8 h-8 object-contain" /></span>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
                About MEE FARMS
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-foreground leading-tight mb-5">
                Modern Solutions for<br />
                <span className="text-primary">Traditional Challenges</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed text-lg">
                MEE FARMS is an integrated agribusiness company addressing food insecurities through crop and livestock farming, agro-inputs distribution, and farmer empowerment. Committed to securing Nigeria's agricultural future while promoting sustainable farming practices.
              </p>
            </div>

            <div className="space-y-4">
              {pillars.map((p, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-xl bg-muted/50 hover:bg-primary/5 transition-colors group">
                  <span className="font-heading text-2xl font-black text-primary/30 group-hover:text-primary/60 transition-colors w-8 flex-shrink-0">{p.num}</span>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <div className="font-heading font-bold text-foreground text-sm">{p.title}</div>
                    <div className="font-body text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary-darker text-white font-semibold px-8"
              asChild
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
