import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, Clock, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type StatusType = "approved" | "pending" | "rejected" | null;

const mockStatuses: Record<string, { status: StatusType; hostel: string; room: string; date: string }> = {
  "A230012": { status: "approved", hostel: "Gulzar Girls Hostel", room: "G-204", date: "2025-07-15" },
  "A230047": { status: "pending", hostel: "Ismat Girls Hostel", room: "—", date: "2025-07-20" },
  "A230132": { status: "rejected", hostel: "—", room: "—", date: "2025-07-10" },
};

const statusConfig = {
  approved: { icon: CheckCircle, label: "Approved", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  pending: { icon: Clock, label: "Pending", color: "text-gold bg-gold-light border-gold" },
  rejected: { icon: XCircle, label: "Rejected", color: "text-destructive bg-destructive/10 border-destructive/30" },
};

const StatusPage = () => {
  const [enrollment, setEnrollment] = useState("");
  const [result, setResult] = useState<typeof mockStatuses[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setResult(mockStatuses[enrollment.toUpperCase()] || null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl font-bold text-foreground mb-3">
                Check <span className="text-gradient">Status</span>
              </h1>
              <p className="text-muted-foreground">Enter your enrollment number to check allotment status</p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
              <div className="flex-1">
                <Label className="sr-only" htmlFor="enrollment">Enrollment Number</Label>
                <Input
                  id="enrollment"
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                  placeholder="Enter enrollment number (e.g. A230132)"
                  className="h-12"
                />
              </div>
              <Button type="submit" size="lg" className="gradient-hero text-primary-foreground rounded-lg px-6">
                <Search className="w-4 h-4" />
              </Button>
            </form>

            {searched && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {result && result.status ? (
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const cfg = statusConfig[result.status];
                        const Icon = cfg.icon;
                        return (
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${cfg.color}`}>
                            <Icon className="w-4 h-4" /> {cfg.label}
                          </span>
                        );
                      })()}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Enrollment</span>
                        <p className="font-semibold text-foreground">{enrollment.toUpperCase()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hostel</span>
                        <p className="font-semibold text-foreground">{result.hostel}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Room</span>
                        <p className="font-semibold text-foreground">{result.room}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date</span>
                        <p className="font-semibold text-foreground">{result.date}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 rounded-2xl border border-border bg-card">
                    <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No application found for this enrollment number.</p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="mt-8 p-4 rounded-xl bg-secondary text-sm text-muted-foreground">
              <strong className="text-secondary-foreground">Demo enrollments:</strong> 23BTCS012HY (Approved), 23BTCS047HY (Pending), 24BLCS002HY (Rejected)
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusPage;
