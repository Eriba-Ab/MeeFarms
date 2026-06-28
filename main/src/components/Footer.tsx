import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-farm-dark text-white/80">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 pt-9 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="Mee Farms Logo" 
                className="relative z-10 h-10 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              An integrated agribusiness company securing Nigeria's food future through sustainable farming practices and community empowerment.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/8 hover:bg-primary flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Products", href: "/products" },
                { label: "Videos", href: "/videos" },
                { label: "Shop", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/55 hover:text-secondary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest">Our Products</h3>
            <ul className="space-y-2.5 font-body text-sm">
              {["Crops & Vegetables", "Livestock & Poultry", "Agro-Chemicals", "Farm Equipment", "Seeds & Seedlings"].map((p) => (
                <li key={p} className="text-white/55 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest">Contact Info</h3>
            <div className="space-y-3.5 font-body text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/55">5 Damder Street, Jalingo, Taraba State, Nigeria</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-white/55 space-y-0.5">
                  <a href="tel:08149196557" className="block hover:text-secondary transition-colors">08149196557</a>
                  <a href="tel:08129545430" className="block hover:text-secondary transition-colors">08129545430</a>
                  <a href="tel:08141127609" className="block hover:text-secondary transition-colors">08141127609</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <a href="mailto:meefarmsconnect@gmail.com" className="text-white/55 hover:text-secondary transition-colors break-all">
                  meefarmsconnect@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2 border-t border-white/10 mt-10">
          <p className="font-body text-xs text-white/35">© 2026 MEE FARMS. All rights reserved.</p>
          <div className="flex gap-6 font-body text-xs">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="text-white/35 hover:text-secondary transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
