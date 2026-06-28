import { Leaf, Target, Eye, Heart, Users, Globe } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import heroFarm from "@/assets/hero-farm.jpg";
import productsCrops from "@/assets/products-crops.jpg";

const values = [
  { icon: Leaf, title: "Sustainability", description: "Environmentally responsible farming that preserves our land for future generations." },
  { icon: Heart, title: "Quality", description: "Producing the highest quality agricultural products for our customers." },
  { icon: Users, title: "Community", description: "Empowering local farmers and strengthening rural communities through outgrower programs." },
  { icon: Globe, title: "Innovation", description: "Embracing modern farming techniques and technology to improve productivity." },
];

const timeline = [
  { year: "2021", label: "Founded", desc: "MEE FARMS established in Taraba State with a vision to transform Nigerian agriculture." },
  { year: "2022", label: "Expansion", desc: "Grew into livestock farming and launched our first outgrower program." },
  { year: "2024", label: "Scale", desc: "Reached 400+ hectares cultivated and expanded agro-chemical distribution." },
  { year: "2026", label: "Today", desc: "Serving communities and empowering 150+ farmers across Nigeria." },
];

const About = () => {
  const heroRef = useReveal();
  const valuesRef = useReveal();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroFarm} alt="" className="w-full h-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-farm-dark/82" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            About MEE FARMS
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Leading Nigeria's<br />
            <span className="text-secondary">Agricultural Future</span>
          </h1>
          <p className="font-body text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            From Taraba State to communities across Nigeria — transforming agriculture through sustainable farming and community empowerment.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="reveal grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
                Our Story
              </div>
              <h2 className="font-heading text-4xl font-black text-foreground mb-6 leading-tight">
                From Vision<br />to <span className="text-primary">Reality</span>
              </h2>
              <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-lg">
                <p>MEE FARMS was founded with a clear vision: to transform Nigeria's agricultural landscape and ensure food security for all. What started as a small farming initiative has grown into an integrated agribusiness company serving communities across multiple states.</p>
                <p>Our journey began in Taraba State, where we recognized the immense potential of Nigeria's fertile lands and the need for modern farming practices. Today, we operate across various agricultural sectors from crop production to livestock farming.</p>
                <p>Through our outgrower programs, we've empowered hundreds of farmers, providing them with the tools, knowledge, and market access needed to thrive.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                <img src={productsCrops} alt="MEE FARMS crops" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden aspect-video shadow-xl flex-1">
                  <img src={heroFarm} alt="MEE FARMS farm" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="bg-primary rounded-2xl p-5 text-white">
                  <div className="font-heading text-4xl font-black text-secondary">150+</div>
                  <div className="font-body text-sm text-white/80 mt-1">Farmers Empowered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">Our Journey</div>
            <h2 className="font-heading text-4xl font-black text-foreground">Our Milestones</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="font-heading font-black text-secondary text-lg">{item.year.slice(-2)}</span>
                </div>
                <div className="font-heading font-bold text-foreground mb-1">{item.label}</div>
                <div className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-farm-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Target, label: "Our Mission", text: "To ensure the all-year-round sustainable cultivation and supply of high-quality agricultural products that are affordable, accessible, efficient, effective, and enhance the quality of life and the environment." },
              { icon: Eye, label: "Our Vision", text: "Through a long-term commitment, we aim to become renowned for leveraging technology and human capital to foster global food security and agricultural innovation in Africa and throughout the world." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-secondary/30 transition-colors group">
                <div className="w-14 h-14 bg-secondary/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/25 transition-colors">
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{item.label}</h3>
                <p className="font-body text-white/60 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="reveal py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">Core Values</div>
            <h2 className="font-heading text-4xl font-black text-foreground mb-4">The Principles That Guide Us</h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">Everything we do at MEE FARMS is guided by our core values.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="group text-center p-6 rounded-2xl bg-muted/50 hover:bg-primary hover:text-white transition-all duration-300 cursor-default">
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors">
                  <value.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-white mb-2 transition-colors">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground group-hover:text-white/80 leading-relaxed transition-colors">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
