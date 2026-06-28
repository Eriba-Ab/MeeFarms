import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut, Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartSheet } from "@/components/CartSheet";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Videos", href: "/videos" },
  { name: "Shop", href: "/shop" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate("/"); };
  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/60 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/5 border-b border-white/10"
            : "bg-white/5 backdrop-blur-sm border-b border-white/10"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="relative flex items-center group p-1 -ml-1">
              <div className={cn(
                "absolute inset-0 rounded-2xl transition-all duration-300 mix-blend-overlay",
                scrolled 
                  ? "bg-background/40 backdrop-blur-lg group-hover:bg-background/60" 
                  : "bg-white/10 backdrop-blur-md group-hover:bg-white/20"
              )} />
              <img 
                src="/logo.png" 
                alt="Mee Farms Logo" 
                className="relative z-10 h-10 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "font-body px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? scrolled
                        ? "text-primary font-semibold"
                        : "text-secondary font-semibold"
                      : scrolled
                      ? "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "relative",
                  scrolled ? "text-foreground hover:text-primary" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-1.5" />
                Cart
                {itemCount > 0 && (
                  <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-secondary text-secondary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className={cn(
                        scrolled
                          ? "bg-primary hover:bg-primary-darker text-white"
                          : "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                      )}
                    >
                      <User className="h-4 w-4 mr-1.5" />
                      {user?.name?.split(" ")[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  className={cn(
                    "font-semibold",
                    scrolled
                      ? "bg-primary hover:bg-primary-darker text-white"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  )}
                  asChild
                >
                  <Link to="/login">Get Started</Link>
                </Button>
              )}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn("relative", scrolled ? "" : "text-white")}
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-secondary text-secondary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className={cn(scrolled ? "" : "text-white")}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — outside nav so backdrop-filter works independently */}
      {isOpen && (
        <div className={cn(
          "md:hidden fixed top-16 left-0 right-0 z-50 pb-4 border-t rounded-b-2xl animate-drop-fade",
          scrolled
            ? "bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-white/10 shadow-lg shadow-black/10"
            : "bg-black/30 backdrop-blur-xl backdrop-saturate-150 border-white/10 shadow-lg shadow-black/10"
        )}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "block px-4 py-3 text-sm font-medium font-body transition-colors",
                isActive(item.href)
                  ? scrolled ? "text-primary font-semibold" : "text-secondary font-semibold"
                  : scrolled ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-4 pt-3 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                  </Button>
                )}
                <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />Logout
                </Button>
              </>
            ) : (
              <Button size="sm" className="w-full bg-primary hover:bg-primary-darker text-white" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
};

export default Navigation;
