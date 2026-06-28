const items = [
  "🌾 Rice", "🌽 Maize", "🥬 Cassava", "🌿 Plantain", "🫘 Beans",
  "🥬 Yam", "🌱 Soya Beans", "🍅 Tomatoes", "🧄 Ginger",
  "🐓 Poultry", "🐟 Catfish", "🐄 Cattle", "🐐 Goat",
  "🌾 Fertilizers", "🧪 Agro-Chemicals", "🌻 Seeds & Seedlings",
];

const MarqueeRow = () => (
  <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
    {[...items, ...items].map((item, i) => (
      <span key={i} className="flex items-center gap-3 text-sm font-semibold font-body uppercase tracking-widest text-foreground/70">
        {item}
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50 ml-3" />
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="relative bg-secondary/10 border-y border-secondary/20 py-4 overflow-hidden select-none">
    <div className="flex items-center gap-8">
      <MarqueeRow />
    </div>
  </div>
);

export default Marquee;
