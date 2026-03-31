import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Building2, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-gold-light text-gold border-gold/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const statusIcons = { approved: CheckCircle, pending: Clock, rejected: XCircle };

const hostelNames: Record<string, string> = {
  gulzar: "Gulzar Girls Hostel",
  ismat: "Ismat Girls Hostel",
  quratulain: "Quratulain Girls Hostel",
};

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("hostel_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filtered = applications.filter(
    (a) =>
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.enrollment_no.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("hostel_applications")
      .update({ status } as any)
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(`Application ${status}`);
  };

  const stats = [
    { icon: Users, label: "Total Applications", value: applications.length, color: "gradient-hero" },
    { icon: CheckCircle, label: "Approved", value: applications.filter((a) => a.status === "approved").length, color: "bg-emerald-500" },
    { icon: Clock, label: "Pending", value: applications.filter((a) => a.status === "pending").length, color: "bg-gold" },
    { icon: Building2, label: "Hostels", value: 3, color: "bg-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Manage hostel applications and allotments</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                      <s.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-card-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or enrollment (e.g. A230132)..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                {filtered.length} results
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enrollment</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Dept</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Hostel</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No applications found</td></tr>
                    ) : (
                      filtered.map((app) => {
                        const status = app.status as "approved" | "pending" | "rejected";
                        const StatusIcon = statusIcons[status] || Clock;
                        return (
                          <tr key={app.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-card-foreground">{app.full_name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{app.enrollment_no}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell capitalize">{app.department}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{hostelNames[app.hostel_preference] || app.hostel_preference}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[status] || ""}`}>
                                <StatusIcon className="w-3 h-3" /> {status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-600 hover:bg-emerald-50" onClick={() => updateStatus(app.id, "approved")}>
                                  Approve
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:bg-destructive/10" onClick={() => updateStatus(app.id, "rejected")}>
                                  Reject
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
