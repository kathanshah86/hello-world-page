import { ArrowLeft, Search, SlidersHorizontal, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import TransactionItem from "@/components/TransactionItem";

const transactions = [
  { name: "Haldirams", amount: 600, time: "Paid Today, 11:02 AM", category: "Food" },
  { name: "Blinkit", amount: 148, time: "Paid Today, 2:26 PM", category: "Groceries" },
  { name: "Uber India Systems", amount: 139.91, time: "Paid Today, 10:33 AM", category: "Travel" },
  { name: "H&M Retail Pvt Ltd", amount: 1899, time: "Paid Today, 8:38 AM", category: "Shopping" },
  { name: "Swiggy", amount: 450, time: "Yesterday, 9:15 PM", category: "Food" },
  { name: "Amazon Pay", amount: 2499, time: "Yesterday, 3:30 PM", category: "Shopping" },
  { name: "Netflix", amount: 649, time: "Yesterday, 12:00 PM", category: "Entertainment" },
];

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Food", "Shopping", "Travel", "Groceries", "Bills"];

  const filteredTx = transactions.filter((tx) => {
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || tx.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = filteredTx.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <div className="bg-gradient-to-br from-navy to-primary px-4 pt-4 pb-5 rounded-b-3xl">
          <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <h1 className="text-lg font-bold text-primary-foreground">Payment History</h1>
          </div>

          {/* Stats Card */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-primary-foreground/70 font-medium">Total Spent This Month</p>
                <p className="text-2xl font-extrabold text-primary-foreground mt-0.5">₹{totalSpent.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search payments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 divide-y divide-border/50 animate-fade-in-up stagger-3">
          {filteredTx.length > 0 ? (
            filteredTx.map((tx, i) => <TransactionItem key={i} {...tx} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">No transactions found</p>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default History;
