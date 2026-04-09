import { ArrowLeft, MoreVertical, Building2, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "sonner";
import { useState } from "react";

const BankTransfer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: "",
    reAccountNumber: "",
    ifsc: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.accountNumber !== formData.reAccountNumber) {
        toast.error("Account numbers do not match");
        return;
    }
    toast.success("Bank details verified!");
  };

  const isFormValid = formData.accountNumber && formData.reAccountNumber && formData.ifsc && formData.name;

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Bank Transfer</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="flex items-center gap-4 bg-primary/10 rounded-xl p-4 mb-6 animate-fade-in-up">
             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
             </div>
             <div>
                <p className="text-sm font-bold text-foreground">Transfer to any bank account</p>
                <p className="text-[11px] text-muted-foreground">Instantly transfer money using IMPS/NEFT</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up stagger-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground px-1">Account Number</label>
              <input
                type="password"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value.replace(/[^0-9]/g, "")})}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground px-1">Re-enter Account Number</label>
              <input
                type="text"
                placeholder="Confirm account number"
                value={formData.reAccountNumber}
                onChange={(e) => setFormData({...formData, reAccountNumber: e.target.value.replace(/[^0-9]/g, "")})}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-muted-foreground px-1">IFSC Code</label>
              <input
                type="text"
                placeholder="e.g. SBIN0001234"
                value={formData.ifsc}
                onChange={(e) => setFormData({...formData, ifsc: e.target.value.toUpperCase()})}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all uppercase"
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-muted-foreground px-1">Account Holder Name</label>
              <input
                type="text"
                placeholder="Enter recipient's name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <button 
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-6"
              >
                Proceed Securely
            </button>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
};

export default BankTransfer;
