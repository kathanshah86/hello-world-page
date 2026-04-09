import { ArrowLeft, MoreVertical, AtSign, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "sonner";

const UPIPayment = () => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (!upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID");
      return;
    }
    setIsVerified(true);
    toast.success("UPI ID Verified: Jane Doe");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Pay UPI ID</h1>
          </div>
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="flex flex-col items-center justify-center py-6 mb-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
               <AtSign className="w-8 h-8 text-primary" />
            </div>
             <p className="text-sm font-semibold text-foreground text-center">Enter any UPI ID or number</p>
             <p className="text-xs text-muted-foreground text-center mt-1">Pay instantly to any UPI app</p>
          </div>

          <div className="animate-fade-in-up stagger-1">
             <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-card focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <input
                  type="text"
                  placeholder="e.g. name@bank"
                  value={upiId}
                  onChange={(e) => {
                      setUpiId(e.target.value.toLowerCase());
                      setIsVerified(false);
                  }}
                  className="flex-1 bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                {!isVerified ? (
                    <button 
                        onClick={handleVerify}
                        disabled={!upiId}
                        className="text-xs font-bold text-primary disabled:opacity-50"
                    >
                        Verify
                    </button>
                ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
             </div>
             
             {isVerified && (
                 <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3 animate-scale-in">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-xs">J</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Jane Doe</p>
                        <p className="text-xs text-muted-foreground">Banking Name</p>
                    </div>
                 </div>
             )}

             <button 
                disabled={!isVerified}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-6"
              >
                Proceed Securely
             </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default UPIPayment;
