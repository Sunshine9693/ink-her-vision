import { motion } from "framer-motion";
import { Building2, Users, Bed, Wifi, ShieldCheck, Utensils } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hostels = [
  {
    name: "Hostel A",
    type: "Girls",
    capacity: 120,
    occupied: 95,
    amenities: ["Wi-Fi", "Mess", "Security", "Laundry"],
    rooms: { single: 20, double: 30, triple: 10 },
  },
  {
    name: "Hostel B",
    type: "Girls",
    capacity: 100,
    occupied: 78,
    amenities: ["Wi-Fi", "Mess", "Security", "Common Room"],
    rooms: { single: 15, double: 25, triple: 12 },
  },
  {
    name: "Hostel C",
    type: "Boys",
    capacity: 150,
    occupied: 130,
    amenities: ["Wi-Fi", "Mess", "Security", "Gym"],
    rooms: { single: 30, double: 40, triple: 10 },
  },
  {
    name: "Hostel D",
    type: "Boys",
    capacity: 130,
    occupied: 110,
    amenities: ["Wi-Fi", "Mess", "Security", "Library"],
    rooms: { single: 25, double: 35, triple: 8 },
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  Mess: Utensils,
  Security: ShieldCheck,
};

const HostelsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Our <span className="text-gradient">Hostels</span>
          </h1>
          <p className="text-muted-foreground text-lg">View hostel details and room availability</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {hostels.map((h, i) => {
            const available = h.capacity - h.occupied;
            const occupancyPct = Math.round((h.occupied / h.capacity) * 100);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-card-foreground">{h.name}</h3>
                      <span className="text-sm text-muted-foreground">{h.type} Hostel</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${available > 10 ? "bg-emerald-50 text-emerald-700" : "bg-rose-light text-rose"}`}>
                    {available} rooms available
                  </span>
                </div>

                {/* Occupancy bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Occupancy</span>
                    <span>{occupancyPct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full gradient-hero transition-all" style={{ width: `${occupancyPct}%` }} />
                  </div>
                </div>

                {/* Room types */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Object.entries(h.rooms).map(([type, count]) => (
                    <div key={type} className="text-center p-2 rounded-lg bg-secondary">
                      <Bed className="w-4 h-4 mx-auto text-primary mb-1" />
                      <div className="text-xs text-muted-foreground capitalize">{type}</div>
                      <div className="text-sm font-semibold text-card-foreground">{count}</div>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="flex gap-2 flex-wrap">
                  {h.amenities.map((a) => {
                    const Icon = amenityIcons[a] || Users;
                    return (
                      <span key={a} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-magenta-light text-magenta font-medium">
                        <Icon className="w-3 h-3" /> {a}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default HostelsPage;
