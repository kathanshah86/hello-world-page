import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import vaanipayLogo from "@/assets/vaanipay-logo.jpeg";

const Auth = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-otp", {
        body: { phone: `+91${phone}` },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.otp) {
        toast.success(`SMS failed. Your OTP is: ${data.otp}`, { duration: 30000 });
      } else {
        toast.success("OTP sent to your mobile number!");
      }
      setStep("otp");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        body: { phone: `+91${phone}`, otp },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        toast.success("Login successful!");
        navigate("/");
      } else {
        throw new Error("No session returned");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-[430px] min-h-screen bg-card shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Logo */}
          <div className="mb-8 animate-fade-in-up">
            <img
              src={vaanipayLogo}
              alt="VaaniPay"
              className="w-32 h-32 rounded-2xl object-cover shadow-lg"
            />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-1 animate-fade-in-up">
            Welcome to VaaniPay
          </h1>
          <p className="text-sm text-muted-foreground mb-8 animate-fade-in-up">
            Login with your mobile number
          </p>

          {step === "phone" ? (
            <div className="w-full space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                <div className="flex items-center gap-1.5 border-r border-border pr-3">
                  <span className="text-base">🇮🇳</span>
                  <span className="text-sm font-semibold text-foreground">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  className="flex-1 bg-transparent text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none tracking-wider"
                  maxLength={10}
                  autoFocus
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={phone.length < 10 || loading}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] text-base"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-fade-in-up">
              <p className="text-sm text-muted-foreground text-center">
                OTP sent to <span className="font-semibold text-foreground">+91 {phone}</span>
              </p>

              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    value={otp[i] || ""}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-border rounded-xl bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const newOtp = otp.split("");
                      newOtp[i] = val;
                      setOtp(newOtp.join(""));
                      if (val && i < 5) {
                        const next = e.target.nextElementSibling as HTMLInputElement;
                        next?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[i] && i > 0) {
                        const prev = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                        prev?.focus();
                      }
                    }}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length < 6 || loading}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] text-base"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                onClick={() => { setStep("phone"); setOtp(""); }}
                className="w-full text-sm text-primary font-medium py-2"
              >
                Change number
              </button>
            </div>
          )}
        </div>

        <div className="pb-8 pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to VaaniPay's Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
