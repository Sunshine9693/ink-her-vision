import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/apply", label: "Apply Now" },
  { path: "/status", label: "Check Status" },
  { path: "/hostels", label: "Hostels" },
  { path: "/admin", label: "Admin" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Hostel<span className="text-gradient">Ease</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-secondary"
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg gradient-hero opacity-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={location.pathname === link.path ? "text-primary font-semibold relative z-10" : "text-muted-foreground relative z-10"}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-4 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                location.pathname === link.path
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
