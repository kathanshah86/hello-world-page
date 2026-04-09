import { ArrowLeft, ChevronRight, Shield, Bell, HelpCircle, Settings, LogOut, CreditCard, Gift, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: CreditCard, label: "Payment Methods", desc: "Manage cards & bank accounts" },
  { icon: Shield, label: "Security & Privacy", desc: "Password, biometrics & more" },
  { icon: Bell, label: "Notifications", desc: "Alerts & preferences" },
  { icon: Gift, label: "Rewards & Offers", desc: "Cashback & discount coupons" },
  { icon: HelpCircle, label: "Help & Support", desc: "FAQ, chat & call support" },
  { icon: Settings, label: "Settings", desc: "Language, theme & more" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-blue-400 px-4 pt-4 pb-8 rounded-b-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <h1 className="text-lg font-bold text-primary-foreground">Profile</h1>
          </div>
          <div className="flex items-center gap-4 animate-fade-in-up stagger-1">
            <div className="w-18 h-18 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-lg" style={{ width: 72, height: 72 }}>
              <span className="text-3xl font-extrabold text-primary-foreground">U</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-primary-foreground">User Name</h2>
              <p className="text-sm text-primary-foreground/70 font-medium">user@vaanipay</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="text-[11px] font-bold text-primary-foreground/80">Gold Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mx-4 -mt-4 mb-4 animate-fade-in-up stagger-2">
          <div className="bg-card rounded-2xl shadow-lg p-4 flex justify-around">
            <div className="text-center">
              <p className="text-lg font-extrabold text-foreground">127</p>
              <p className="text-[10px] text-muted-foreground font-medium">Transactions</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-extrabold text-foreground">₹1.2L</p>
              <p className="text-[10px] text-muted-foreground font-medium">This Month</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-extrabold text-accent">🪙 1,198</p>
              <p className="text-[10px] text-muted-foreground font-medium">Rewards</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 animate-fade-in-up stagger-3">
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {menuItems.map(({ icon: Icon, label, desc }, i) => (
              <button key={label} className={`w-full flex items-center gap-4 px-4 py-3.5 hover:bg-muted/40 active:bg-muted/60 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-border/40" : ""
              }`}>
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-[11px] text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 mt-4 mb-6 py-3.5 rounded-2xl border border-destructive/20 hover:bg-destructive/5 active:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Log out</span>
          </button>
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default Profile;
