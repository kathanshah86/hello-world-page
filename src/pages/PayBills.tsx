import { ArrowLeft, MoreVertical, Search, Zap, Droplets, Flame, Wifi, MonitorPlay, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

const categories = [
    { icon: Zap, label: "Electricity", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Droplets, label: "Water", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Flame, label: "Piped Gas", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Wifi, label: "Broadband", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: MonitorPlay, label: "DTH", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: CreditCard, label: "Credit Card", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const PayBills = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Pay Bills</h1>
          </div>
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5 mb-6 animate-fade-in-up">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for biller"
              className="bg-transparent border-none text-sm font-medium text-foreground w-full focus:outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mb-6 animate-fade-in-up stagger-1">
             <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start justify-between">
                 <div>
                     <p className="text-sm font-bold text-foreground mb-1">Upcoming Bill</p>
                     <p className="text-xs text-muted-foreground mb-3">BESCOM Electricity • Consumer ID: 123456</p>
                     <p className="text-xl font-black text-foreground">₹ 1,240</p>
                 </div>
                 <button className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full active:scale-95 transition-transform">
                     Pay Now
                 </button>
             </div>
          </div>

          <div className="animate-fade-in-up stagger-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Payment Categories</h3>
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
               {categories.map((cat, i) => (
                   <button key={i} className="flex flex-col items-center gap-2 group">
                      <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                         <cat.icon className={`w-6 h-6 ${cat.color}`} />
                      </div>
                      <span className="text-[11px] font-medium text-center text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-1">{cat.label}</span>
                   </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PayBills;
