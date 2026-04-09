import { ArrowLeft, MoreVertical, ArrowDown, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "sonner";

const SelfTransfer = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
      if (!amount || Number(amount) <= 0) {
          toast.error("Please enter a valid amount");
          return;
      }
      toast.success(`Transferring ₹${amount} successfully!`);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Self Transfer</h1>
          </div>
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="px-4 py-6">
           <div className="relative animate-fade-in-up">
              {/* From Account */}
              <div className="bg-card border border-border rounded-xl p-4 mb-2 hover:border-primary/50 transition-colors cursor-pointer">
                 <p className="text-xs font-semibold text-muted-foreground mb-2">Transfer from</p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                       <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">HDFC Bank</p>
                        <p className="text-xs text-muted-foreground">A/C No. •••• 1234</p>
                    </div>
                 </div>
              </div>

              {/* Swap Icon */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-muted cursor-pointer transition-colors">
                  <ArrowDown className="w-4 h-4 text-primary" />
              </div>

              {/* To Account */}
              <div className="bg-card border border-border rounded-xl p-4 mt-2 hover:border-primary/50 transition-colors cursor-pointer">
                 <p className="text-xs font-semibold text-muted-foreground mb-2">Transfer to</p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                       <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">ICICI Bank</p>
                        <p className="text-xs text-muted-foreground">A/C No. •••• 9876</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-8 animate-fade-in-up stagger-1">
              <div className="flex items-center justify-center text-4xl font-bold text-foreground mb-6">
                 <span className="text-muted-foreground mr-1">₹</span>
                 <input 
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="0"
                    className="w-24 bg-transparent outline-none text-center"
                    autoFocus
                 />
              </div>

              <button 
                onClick={handleTransfer}
                disabled={!amount}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                Transfer funds
             </button>
           </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SelfTransfer;
