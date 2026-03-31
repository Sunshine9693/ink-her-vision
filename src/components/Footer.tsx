import { Building2, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-wine text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5" />
            <span className="font-display text-lg font-bold">MANUU Automated Hostel Allocation System</span>
          </div>
          <p className="text-sm opacity-80">
            Automated Hostel Allocation System for MANUU University. Making hostel allotment transparent, efficient, and student-friendly.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Apply for Hostel</li>
            <li>Check Allotment Status</li>
            <li>View Available Hostels</li>
            <li>Contact Admin</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <p className="text-sm opacity-80">
            Maulana Azad National Urdu University<br />
            Gachibowli, Hyderabad - 500032<br />
            Department of CS&IT
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-70 flex items-center justify-center gap-1">
        Made with <Heart className="w-3.5 h-3.5 text-rose fill-rose" /> by Afreen, Sana & Nusrat
      </div>
    </div>
  </footer>
);

export default Footer;
