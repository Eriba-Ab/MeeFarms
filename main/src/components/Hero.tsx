import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroFarm from "@/assets/hero-farm.png";
import Marquee from "@/components/Marquee"

const stats = [
  { value: "150+", label: "Farmers Empowered" },
  { value: "400+", label: "Hectares Cultivated" },
  { value: "15+", label: "Varieties of Premium Crops & Livestock" },
];

const Hero = () => {
  return (
    <section className="relative h-dvh w-full flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFarm}
          alt="MEE FARMS agricultural landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-farm-earth/90 via-farm-dark/75 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-12 pt-18 pb-2">
        <div className="flex flex-col items-center lg:items-end lg:flex-row lg:justify-between gap-10">
          {/* Left: Main headline */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-up-delay-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-float inline-block" />
              From Our Farm, to your table
            </div>

            <h1 className="font-heading font-black text-7xl sm:text-9xl lg:text-10xl text-white leading-[1.05] mb-12 lg:mb-20 animate-fade-up-delay-2">
              MEE<br />
              <span className="text-secondary">FARMS</span>
            </h1>
 
            {/* Stats row */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 animate-fade-up-delay-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-heading text-3xl font-black text-secondary">{s.value}</div>
                  <div className="font-body text-white/100 text-xs uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Secondary headline + CTA */}
          <div className="max-w-lg text-center lg:text-right animate-fade-up-delay-3">
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white/90 leading-[1.08] mb-6">
              Healthy Eating,<br />
              <span className="text-primary-foreground/80">Healthy Living</span>
            </h2>
            <p className="font-body text-white/70 text-lg mb-8 mx-auto lg:mx-0 lg:ml-auto max-w-sm">
              An integrated agribusiness securing Nigeria's food future through sustainable farming and community empowerment.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-7 py-5 text-base shadow-xl hover:scale-105 transition-transform"
                asChild
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-5 text-base backdrop-blur-sm"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/*Marquee*/}
      <div className="absolute bottom-0 left-0 right-0 z-20"> 
        <Marquee />
      </div>
    </section>
  );
};

export default Hero;
