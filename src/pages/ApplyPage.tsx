import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    enrollmentNo: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    hostelPreference: "",
    roomType: "",
    address: "",
    distance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! Check your status using your enrollment number.");
    setFormData({
      fullName: "", enrollmentNo: "", email: "", phone: "",
      department: "", year: "", hostelPreference: "", roomType: "", address: "", distance: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl font-bold text-foreground mb-3">
                Apply for <span className="text-gradient">Hostel</span>
              </h1>
              <p className="text-muted-foreground">Fill out the form below to apply for hostel accommodation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl border border-border bg-card shadow-soft">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} required placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentNo">Enrollment Number</Label>
                  <Input id="enrollmentNo" value={formData.enrollmentNo} onChange={(e) => handleChange("enrollmentNo", e.target.value)} required placeholder="e.g. A230012" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={formData.department} onValueChange={(v) => handleChange("department", v)}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="language">Language Department</SelectItem>
                      <SelectItem value="science">School of Science</SelectItem>
                      <SelectItem value="science-tech">School of Science and Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year of Study</Label>
                  <Select value={formData.year} onValueChange={(v) => handleChange("year", v)}>
                    <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hostel Preference</Label>
                  <Select value={formData.hostelPreference} onValueChange={(v) => handleChange("hostelPreference", v)}>
                    <SelectTrigger><SelectValue placeholder="Select hostel" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gulzar">Gulzar Girls Hostel</SelectItem>
                      <SelectItem value="ismat">Ismat Girls Hostel</SelectItem>
                      <SelectItem value="quratulain">Quratulain Girls Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Floor Preference</Label>
                  <Select value={formData.roomType} onValueChange={(v) => handleChange("roomType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select floor" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ground">Ground Floor</SelectItem>
                      <SelectItem value="first">First Floor</SelectItem>
                      <SelectItem value="second">Second Floor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Permanent Address</Label>
                  <Textarea id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Enter your permanent address" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from Hometown (in km)</Label>
                  <Input id="distance" type="number" value={formData.distance} onChange={(e) => handleChange("distance", e.target.value)} placeholder="e.g. 250" />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full gradient-hero text-primary-foreground rounded-full text-base font-semibold hover:scale-[1.02] transition-transform">
                Submit Application
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyPage;
