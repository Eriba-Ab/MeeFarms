import { useState } from "react";
import { Play } from "lucide-react";

interface VideoFrameProps {
  thumbnail: string;
  title: string;
  subtitle?: string;
  label?: string;
  youtubeId: string;
  large?: boolean;
}

export const VideoFrame = ({
  thumbnail,
  title,
  subtitle,
  label,
  youtubeId,
  large = false,
}: VideoFrameProps) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={large ? "aspect-video" : "h-full min-h-[160px]"}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`${large ? "aspect-video" : "h-full min-h-[160px]"} relative overflow-hidden cursor-pointer`}
      onClick={() => setPlaying(true)}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`w-full h-full object-cover group-hover:scale-${large ? "105" : "110"} transition-transform duration-700`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        {large ? (
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-secondary/30 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="relative w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-2xl shadow-secondary/40 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-secondary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary/50 group-hover:shadow-lg group-hover:shadow-secondary/30 transition-all duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-6" : "p-4"} bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end h-full`}>
        {label && (
          <div className="self-start inline-block bg-secondary/20 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            {label}
          </div>
        )}
        <h3 className={`font-heading ${large ? "text-xl sm:text-2xl" : "text-sm"} font-bold text-white drop-shadow-lg ${large ? "" : "line-clamp-2"}`}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/70 text-sm mt-1.5 font-body">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
