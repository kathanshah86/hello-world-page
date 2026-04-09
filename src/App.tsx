import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Balance from "./pages/Balance.tsx";
import History from "./pages/History.tsx";
import Recharge from "./pages/Recharge.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScanQR from "./pages/ScanQR.tsx";
import PayContact from "./pages/PayContact.tsx";
import PayPhone from "./pages/PayPhone.tsx";
import BankTransfer from "./pages/BankTransfer.tsx";
import UPIPayment from "./pages/UPIPayment.tsx";
import SelfTransfer from "./pages/SelfTransfer.tsx";
import PayBills from "./pages/PayBills.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/history" element={<History />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/pay-contact" element={<PayContact />} />
          <Route path="/pay-phone" element={<PayPhone />} />
          <Route path="/bank-transfer" element={<BankTransfer />} />
          <Route path="/upi" element={<UPIPayment />} />
          <Route path="/self-transfer" element={<SelfTransfer />} />
          <Route path="/pay-bills" element={<PayBills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
