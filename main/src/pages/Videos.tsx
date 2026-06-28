import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";
import productsCrops from "@/assets/products-crops.jpg";
import productsLivestock from "@/assets/products-livestock.jpg";
import { useReveal } from "@/hooks/useReveal";
import { VideoFrame } from "@/components/VideoFrame";

const videoCategories = [
  {
    title: "Farm Operations",
    videos: [
      { title: "Modern Rice Farming Techniques", description: "See how we use modern irrigation and harvesting methods for premium rice production.", duration: "5:42", views: "2.1K", date: "2024-01-15", thumb: productsCrops },
      { title: "Livestock Management Best Practices", description: "Tour our livestock facilities and learn about our animal welfare standards.", duration: "7:28", views: "1.8K", date: "2024-01-10", thumb: productsLivestock },
      { title: "Sustainable Farming Methods", description: "Discover our environmentally friendly farming practices and soil conservation techniques.", duration: "6:15", views: "3.2K", date: "2024-01-05", thumb: heroFarm },
    ],
  },
  {
    title: "Training & Education",
    videos: [
      { title: "Outgrower Program Training Session", description: "Watch farmers learn modern agricultural techniques through our empowerment programs.", duration: "12:30", views: "1.5K", date: "2023-12-20", thumb: productsCrops },
      { title: "Crop Disease Prevention Workshop", description: "Educational workshop on identifying and preventing common crop diseases.", duration: "8:45", views: "2.8K", date: "2023-12-15", thumb: productsLivestock },
    ],
  },
  {
    title: "Company Stories",
    videos: [
      { title: "MEE FARMS Journey: From Vision to Reality", description: "The inspiring story of how MEE FARMS grew from a small initiative to transform Nigerian agriculture.", duration: "15:20", views: "5.4K", date: "2023-12-01", thumb: heroFarm },
      { title: "Impact Stories: Farmers We've Empowered", description: "Meet the farmers whose lives have been transformed through our outgrower programs.", duration: "9:33", views: "4.1K", date: "2023-11-20", thumb: productsCrops },
    ],
  },
];

const Videos = () => {
  const ref = useReveal();

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
            MEE FARMS Videos
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Stories From <span className="text-secondary">the Farm</span>
          </h1>
          <p className="font-body text-xl text-white/70 max-w-2xl mx-auto">
            Experience our farming operations, learn from our experts, and discover the stories behind Nigeria's agricultural transformation.
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-secondary/15 text-secondary-foreground border-0 mb-3">Featured Video</Badge>
              <h2 className="font-heading text-3xl font-black text-foreground mb-2">Inside MEE FARMS: A Complete Tour</h2>
              <p className="font-body text-muted-foreground">Take a comprehensive tour of our integrated farming operations across Taraba State.</p>
            </div>

            <div className="group rounded-2xl overflow-hidden shadow-2xl border border-border">
              <VideoFrame
                thumbnail={heroFarm}
                title="Watch Our Story"
                subtitle="Discover how we're revolutionizing agriculture in Nigeria"
                youtubeId="yXBXK9LZoj4"
                large
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Categories */}
      <section ref={ref} className="reveal py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {videoCategories.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="font-heading text-2xl font-black text-foreground">{cat.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.videos.map((video, vi) => (
                  <div key={vi} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 bg-card">
                    <VideoFrame
                      thumbnail={video.thumb}
                      title={video.title}
                      subtitle={`${video.duration} · ${video.views} views`}
                      youtubeId="yXBXK9LZoj4"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-heading text-3xl font-black text-white mb-4">Want to See More?</h2>
          <p className="font-body text-white/70 mb-8 text-lg">
            Subscribe to our YouTube channel for the latest updates on our farming operations, educational content, and inspiring stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">Subscribe to YouTube</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
