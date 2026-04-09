import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import ContactAvatar from "@/components/ContactAvatar";

const allContacts = [
  { name: "Aarav Patel", phone: "+91 98765 43210" },
  { name: "Amit Singh", phone: "+91 98765 43211" },
  { name: "Diya Rangarajan", phone: "+91 98765 43212" },
  { name: "Inayat Verma", phone: "+91 98765 43213" },
  { name: "Neha Gupta", phone: "+91 98765 43214" },
  { name: "Priya Sharma", phone: "+91 98765 43215" },
  { name: "Rishi Goli", phone: "+91 98765 43216" },
  { name: "Sahil Sehgal", phone: "+91 98765 43217" },
];

const recentContacts = [
  { name: "Inayat Verma" },
  { name: "Amit Singh" },
  { name: "Rishi Goli" },
  { name: "Sahil Sehgal" },
];

const PayContact = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = allContacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  );

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Pay Contacts</h1>
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
              placeholder="Search any contact or number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-foreground w-full focus:outline-none placeholder:text-muted-foreground"
            />
          </div>

          {!searchQuery && (
            <div className="mb-6 animate-fade-in-up stagger-1">
              <h3 className="text-sm font-bold text-foreground mb-3">Recents</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recentContacts.map((contact) => (
                  <ContactAvatar key={contact.name} name={contact.name} />
                ))}
              </div>
            </div>
          )}

          <div className="animate-fade-in-up stagger-2">
            <h3 className="text-sm font-bold text-foreground mb-3">All Contacts on VaaniPay</h3>
            <div className="space-y-1">
              {filteredContacts.map((contact, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-card hover:shadow-sm transition-all active:scale-[0.99] group border border-transparent hover:border-border/50"
                  onClick={() => {}}
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{contact.name[0]}</span>
                  </div>
                  <div className="text-left flex-1 border-b border-border/40 pb-3 group-hover:border-transparent transition-colors">
                    <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PayContact;
