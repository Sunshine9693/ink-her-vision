Remove-Item .\src\pages\ApplyPage_new.tsximport { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ApplyPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    enrollmentNo: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    caste: "",
    hostelPreference: "",
    floorPreference: "",
    address: "",
    distance: "",
    casteCertificate: null as File | null,
    ticket: null as File | null,
    class10Marksheet: null as File | null,
    class12Marksheet: null as File | null,
    aadharCardUser: null as File | null,
    aadharCardParent: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate caste-related fields
      if (formData.caste === "obc") {
        if (!formData.casteCertificate || !formData.ticket || !formData.class10Marksheet || 
            !formData.class12Marksheet || !formData.aadharCardUser || !formData.aadharCardParent) {
          toast.error("All documents are required for OBC category");
          setLoading(false);
          return;
        }
      } else if (formData.caste === "general") {
        if (!formData.class10Marksheet || !formData.class12Marksheet || 
            !formData.aadharCardUser || !formData.aadharCardParent) {
          toast.error("All documents are required for General category");
          setLoading(false);
          return;
        }
      }

      // Upload files to Supabase storage
      let fileUrls: any = {};
      if (formData.caste === "obc") {
        const files = {
          casteCertificate: formData.casteCertificate,
          ticket: formData.ticket,
          class10Marksheet: formData.class10Marksheet,
          class12Marksheet: formData.class12Marksheet,
          aadharCardUser: formData.aadharCardUser,
          aadharCardParent: formData.aadharCardParent,
        };

        for (const [key, file] of Object.entries(files)) {
          if (file) {
            const fileName = `${formData.enrollmentNo.toUpperCase()}_${key}_${Date.now()}`;
            const { data, error: uploadError } = await supabase.storage
              .from("hostel_documents")
              .upload(fileName, file);

            if (uploadError) throw new Error(`Failed to upload ${key}: ${uploadError.message}`);
            fileUrls[key] = data.path;
          }
        }
      } else if (formData.caste === "general") {
        const files = {
          class10Marksheet: formData.class10Marksheet,
          class12Marksheet: formData.class12Marksheet,
          aadharCardUser: formData.aadharCardUser,
          aadharCardParent: formData.aadharCardParent,
        };

        for (const [key, file] of Object.entries(files)) {
          if (file) {
            const fileName = `${formData.enrollmentNo.toUpperCase()}_${key}_${Date.now()}`;
            const { data, error: uploadError } = await supabase.storage
              .from("hostel_documents")
              .upload(fileName, file);

            if (uploadError) throw new Error(`Failed to upload ${key}: ${uploadError.message}`);
            fileUrls[key] = data.path;
          }
        }
      }

      const { error } = await supabase.from("hostel_applications").insert({
        full_name: formData.fullName,
        enrollment_no: formData.enrollmentNo.toUpperCase(),
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        year: formData.year,
        caste: formData.caste,
        hostel_preference: formData.hostelPreference,
        floor_preference: formData.floorPreference,
        address: formData.address,
        distance: formData.distance,
        ...(fileUrls && Object.keys(fileUrls).length > 0 && { documents: fileUrls }),
      } as any);
      if (error) throw error;
      toast.success("Application submitted successfully! Check your status using your enrollment number.");
      setFormData({
        fullName: "", enrollmentNo: "", email: "", phone: "",
        department: "", year: "", caste: "", hostelPreference: "", floorPreference: "", 
        address: "", distance: "",
        casteCertificate: null,
        ticket: null,
        class10Marksheet: null,
        class12Marksheet: null,
        aadharCardUser: null,
        aadharCardParent: null,
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
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
                  <Label>Caste Category</Label>
                  <Select value={formData.caste} onValueChange={(v) => handleChange("caste", v)}>
                    <SelectTrigger><SelectValue placeholder="Select caste category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC (Other Backward Classes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.caste === "obc" && (
                <div className="space-y-6 p-6 rounded-lg border border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-amber-800 font-semibold">OBC Category - Documents Required</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="casteCertificate">Caste Certificate (PDF)</Label>
                      <p className="text-xs text-gray-600">Valid OBC certificate issued by competent authority</p>
                      <Input 
                        id="casteCertificate" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("casteCertificate", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.casteCertificate && <p className="text-sm text-green-600">✓ {formData.casteCertificate.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ticket">Ticket/Challan (PDF)</Label>
                      <p className="text-xs text-gray-600">Caste certificate fee payment challan/ticket</p>
                      <Input 
                        id="ticket" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("ticket", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.ticket && <p className="text-sm text-green-600">✓ {formData.ticket.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class10Marksheet">10th Grade Marksheet (PDF)</Label>
                      <p className="text-xs text-gray-600">Board examination marksheet/certificate</p>
                      <Input 
                        id="class10Marksheet" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("class10Marksheet", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.class10Marksheet && <p className="text-sm text-green-600">✓ {formData.class10Marksheet.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class12Marksheet">12th Grade Marksheet (PDF)</Label>
                      <p className="text-xs text-gray-600">Board examination marksheet/certificate</p>
                      <Input 
                        id="class12Marksheet" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("class12Marksheet", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.class12Marksheet && <p className="text-sm text-green-600">✓ {formData.class12Marksheet.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharCardUser">Aadhar Card - Student (PDF)</Label>
                      <p className="text-xs text-gray-600">Your Aadhar card copy</p>
                      <Input 
                        id="aadharCardUser" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("aadharCardUser", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.aadharCardUser && <p className="text-sm text-green-600">✓ {formData.aadharCardUser.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharCardParent">Aadhar Card - Parent/Guardian (PDF)</Label>
                      <p className="text-xs text-gray-600">Parent or guardian's Aadhar card copy</p>
                      <Input 
                        id="aadharCardParent" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("aadharCardParent", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.aadharCardParent && <p className="text-sm text-green-600">✓ {formData.aadharCardParent.name}</p>}
                    </div>
                  </div>
                </div>
              )}

              {formData.caste === "general" && (
                <div className="space-y-6 p-6 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-blue-800 font-semibold">General Category - Documents Required</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="class10Marksheet">10th Grade Marksheet (PDF)</Label>
                      <p className="text-xs text-gray-600">Board examination marksheet/certificate</p>
                      <Input 
                        id="class10Marksheet" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("class10Marksheet", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.class10Marksheet && <p className="text-sm text-green-600">✓ {formData.class10Marksheet.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class12Marksheet">12th Grade Marksheet (PDF)</Label>
                      <p className="text-xs text-gray-600">Board examination marksheet/certificate</p>
                      <Input 
                        id="class12Marksheet" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("class12Marksheet", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.class12Marksheet && <p className="text-sm text-green-600">✓ {formData.class12Marksheet.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharCardUser">Aadhar Card - Student (PDF)</Label>
                      <p className="text-xs text-gray-600">Your Aadhar card copy</p>
                      <Input 
                        id="aadharCardUser" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("aadharCardUser", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.aadharCardUser && <p className="text-sm text-green-600">✓ {formData.aadharCardUser.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharCardParent">Aadhar Card - Parent/Guardian (PDF)</Label>
                      <p className="text-xs text-gray-600">Parent or guardian's Aadhar card copy</p>
                      <Input 
                        id="aadharCardParent" 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange("aadharCardParent", e.target.files?.[0] || null)}
                        required 
                      />
                      {formData.aadharCardParent && <p className="text-sm text-green-600">✓ {formData.aadharCardParent.name}</p>}
                    </div>
                  </div>
                </div>
              )}

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
                  <Select value={formData.floorPreference} onValueChange={(v) => handleChange("floorPreference", v)}>
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

              <Button type="submit" size="lg" disabled={loading} className="w-full gradient-hero text-primary-foreground rounded-full text-base font-semibold hover:scale-[1.02] transition-transform">
                {loading ? "Submitting..." : "Submit Application"}
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
