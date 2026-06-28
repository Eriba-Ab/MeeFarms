import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import heroFarm from "@/assets/hero-farm.jpg";
import productsCrops from "@/assets/products-crops.jpg";
import productsLivestock from "@/assets/products-livestock.jpg";

import { VideoFrame } from "./VideoFrame";

const VideoFeature = () => {
  const revealHeader = useReveal();
  const revealGrid = useReveal();
  const revealCta = useReveal();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroFarm} alt="" className="w-full h-full object-cover scale-105" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-farm-dark/95 via-farm-dark/85 to-farm-dark/95" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={revealHeader} className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/25 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-float inline-block" />
              From Field to Future
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white leading-tight">
              Inside <span className="text-secondary">MEE FARMS</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="font-body text-white/70 leading-relaxed text-base">
              Take a behind-the-scenes look at our modern farming operations, sustainable practices, and the passionate team working to feed Nigeria.
            </p>
          </div>
        </div>

        <div ref={revealGrid} className="reveal grid lg:grid-cols-3 gap-5">
          {/* Featured video - 2 col */}
          <div className="lg:col-span-2 group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/15 hover:border-secondary/50 transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-secondary/10">
            <VideoFrame
              thumbnail={heroFarm}
              title="Inside MEE FARMS: A Complete Tour"
              subtitle="18:42 · 8.7K views"
              label="Featured Video"
              youtubeId="yXBXK9LZoj4"
              large
            />
          </div>

          {/* Side thumbnails */}
          <div className="flex flex-col gap-5">
            {[
              { title: "Modern Rice Farming Techniques", subtitle: "5:42 · 3.2K views", img: productsCrops },
              { title: "Livestock Management Best Practices", subtitle: "7:28 · 5.1K views", img: productsLivestock },
            ].map((v, i) => (
              <div
                key={i}
                className="group rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/15 hover:border-secondary/50 transition-all duration-500 flex-1 shadow-xl shadow-black/15 hover:shadow-secondary/10"
              >
                <VideoFrame
                  thumbnail={v.img}
                  title={v.title}
                  subtitle={v.subtitle}
                  youtubeId="yXBXK9LZoj4"
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={revealCta} className="reveal text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-secondary hover:border-secondary hover:text-secondary-foreground font-semibold gap-2 px-8 transition-all duration-300"
            asChild
          >
            <Link to="/videos">
              View All Videos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoFeature;
