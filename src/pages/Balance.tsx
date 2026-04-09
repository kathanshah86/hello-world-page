import { ArrowLeft, Plus, ChevronRight, MoreVertical, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import TransactionItem from "@/components/TransactionItem";

const accounts = [
  { name: "UPI Lite", balance: "558.66", type: "lite" as const },
  { name: "HDFC Bank", account: "A/c No - 1234", balance: null, primary: true },
  { name: "Paytm Payments", account: "A/c No - 5678", balance: null },
];

const transactions = [
  { name: "Blue Tokai Mart", amount: 600, time: "Paid Today, 11:02 AM", category: "Food" },
  { name: "Blinkit", amount: 148, time: "Paid Today, 2:26 PM", category: "Groceries" },
  { name: "Uber India", amount: 139.91, time: "Paid Today, 10:33 AM", category: "Travel" },
  { name: "H&M Retail", amount: 1899, time: "Paid Today, 8:38 AM", category: "Shopping" },
];

const Balance = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-navy to-primary px-4 pt-4 pb-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors">
                <ArrowLeft className="w-5 h-5 text-primary-foreground" />
              </button>
              <h1 className="text-lg font-bold text-primary-foreground">Balance & History</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-primary-foreground/10 rounded-full px-3 py-1.5">
                <span className="text-lg">🪙</span>
                <span className="text-sm font-bold text-primary-foreground">1,198</span>
              </div>
              <button className="p-1.5 rounded-full hover:bg-primary-foreground/10">
                <MoreVertical className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>

          {/* Accounts Carousel */}
          <div className="animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-primary-foreground/80">Your Accounts</h2>
              <button onClick={() => setShowBalance(!showBalance)} className="p-1 text-primary-foreground/60">
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {accounts.map((acc) => (
                <div
                  key={acc.name}
                  className={`rounded-2xl p-4 min-w-[155px] shrink-0 relative transition-all hover:shadow-lg cursor-pointer active:scale-[0.98] ${
                    acc.type === "lite"
                      ? "bg-gradient-to-br from-primary to-blue-400 text-primary-foreground"
                      : "bg-card text-card-foreground shadow-md"
                  }`}
                >
                  {acc.primary && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Primary
                    </span>
                  )}
                  <p className="text-sm font-bold">{acc.name}</p>
                  {acc.account && <p className="text-[11px] opacity-60 mt-0.5">{acc.account}</p>}
                  <button className="flex items-center gap-1 mt-2 opacity-80 hover:opacity-100">
                    <Plus className="w-3 h-3" />
                    <span className="text-[11px] font-medium">Add Money</span>
                  </button>
                  {acc.balance ? (
                    <p className="text-xl font-extrabold mt-2">
                      {showBalance ? `₹${acc.balance}` : "₹•••"}
                    </p>
                  ) : (
                    <button className="mt-2 bg-muted text-foreground text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-muted/80 transition-colors">
                      Check Balance
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="flex-1 bg-card mt-4 rounded-t-3xl">
          <div className="px-4 pt-5 pb-3 animate-fade-in-up stagger-2">
            <h2 className="text-lg font-bold text-foreground mb-3">Payment History</h2>
            <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5 mb-4">
              <span className="text-sm text-muted-foreground">Search or filter your payments</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">July 2025</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Total Spent</span>
                <span className="text-sm font-bold text-foreground">₹1,01,982.72</span>
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/50 animate-fade-in-up stagger-3">
            {transactions.map((tx) => (
              <TransactionItem key={tx.name} {...tx} />
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default Balance;
