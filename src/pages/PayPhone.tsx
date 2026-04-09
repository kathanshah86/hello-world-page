import { ArrowLeft, MoreVertical, Contact } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "sonner";

const PayPhone = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleProceed = () => {
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid 10-digit number");
      return;
    }
    toast.success("Ready to pay!");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Pay Phone Number</h1>
          </div>
          <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="text-sm text-muted-foreground mb-6 animate-fade-in-up">Pay any mobile number from your bank account instantly via UPI.</p>
          
          <div className="flex items-center gap-3 border-b-2 border-primary pb-2 mb-6 animate-fade-in-up stagger-1">
            <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1 bg-muted/50">
              <span className="text-sm">🇮🇳</span>
              <span className="text-sm font-semibold text-foreground">+91</span>
            </div>
            <input
              type="tel"
              placeholder="00000 00000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
              className="flex-1 bg-transparent text-xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none tracking-wider"
              maxLength={10}
              autoFocus
            />
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Contact className="w-6 h-6 text-primary" />
            </button>
          </div>

          <div className="animate-fade-in-up stagger-2">
             <button 
                onClick={handleProceed}
                disabled={phoneNumber.length < 10}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                Proceed securely
             </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PayPhone;
