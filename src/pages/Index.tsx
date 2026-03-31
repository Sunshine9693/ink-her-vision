import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, ClipboardList, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hostel-hero.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: ClipboardList,
    title: "Online Application",
    desc: "Apply for hostel accommodation from anywhere, anytime. No more standing in queues.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Allotment",
    desc: "Fair room allocation based on predefined criteria with full transparency.",
  },
  {
    icon: Users,
    title: "Student Dashboard",
    desc: "Track your application status, room details, and allotment information online.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Your data is protected with modern security standards and authentication.",
  },
];

const stats = [
  { value: "500+", label: "Rooms Available" },
  { value: "2000+", label: "Students Served" },
  { value: "6", label: "Hostels" },
  { value: "99%", label: "Satisfaction Rate" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Modern university hostel"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine/90 via-primary/70 to-accent/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6 border border-primary-foreground/30">
              MANUU University
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              MANUU <span className="text-gold">Automated Hostel Allocation System</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 font-light leading-relaxed">
              Automated Hostel Allocation System — making hostel allotment smooth, transparent, and student-friendly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-warm text-primary-foreground border-0 rounded-full px-8 text-base font-semibold shadow-glow hover:scale-105 transition-transform">
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                <Link to="/status">Check Status</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Why <span className="text-gradient">MANUU AHAS</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A modern solution to replace manual hostel allotment with digital efficiency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">About the Project</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The <strong className="text-foreground">Hostel Ease</strong> system is developed as part of the B.Tech program at
                Maulana Azad National Urdu University, Hyderabad. It automates the hostel allocation process, ensuring
                transparency, accuracy, and efficiency in managing student accommodations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Supervised by <strong className="text-foreground">Mr. Ahmad Talha Siddiqui</strong>, Department of CS&IT.
                Built by Afreen Alim, Sana Fatma & Nusrat Fatma.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
