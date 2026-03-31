import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, Clock, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type StatusType = "approved" | "pending" | "rejected";

const statusConfig = {
  approved: { icon: CheckCircle, label: "Approved", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  pending: { icon: Clock, label: "Pending", color: "text-gold bg-gold-light border-gold" },
  rejected: { icon: XCircle, label: "Rejected", color: "text-destructive bg-destructive/10 border-destructive/30" },
};

const hostelNames: Record<string, string> = {
  gulzar: "Gulzar Girls Hostel",
  ismat: "Ismat Girls Hostel",
  quratulain: "Quratulain Girls Hostel",
};

const StatusPage = () => {
  const [enrollment, setEnrollment] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hostel_applications")
        .select("*")
        .eq("enrollment_no", enrollment.toUpperCase())
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      setResult(data && data.length > 0 ? data[0] : null);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
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
              <Button type="submit" size="lg" disabled={loading} className="gradient-hero text-primary-foreground rounded-lg px-6">
                <Search className="w-4 h-4" />
              </Button>
            </form>

            {searched && !loading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {result ? (
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const status = result.status as StatusType;
                        const cfg = statusConfig[status] || statusConfig.pending;
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
                        <span className="text-muted-foreground">Name</span>
                        <p className="font-semibold text-foreground">{result.full_name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Enrollment</span>
                        <p className="font-semibold text-foreground">{result.enrollment_no}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hostel</span>
                        <p className="font-semibold text-foreground">{hostelNames[result.hostel_preference] || result.hostel_preference}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Floor</span>
                        <p className="font-semibold text-foreground capitalize">{result.floor_preference}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Department</span>
                        <p className="font-semibold text-foreground capitalize">{result.department}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied On</span>
                        <p className="font-semibold text-foreground">{new Date(result.created_at).toLocaleDateString()}</p>
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

            {loading && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">Searching...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusPage;
