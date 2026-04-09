import { ArrowLeft, MoreVertical, Flashlight, Image as ImageIcon, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import MobileLayout from "@/components/MobileLayout";
import { toast } from "sonner";

const ScanQR = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
      },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        toast.success(`Scanned: ${decodedText}`);
        scanner.clear(); // Stop scanning after success
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 sticky top-0 z-10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold">Scan any QR</h1>
          </div>
          <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <MoreVertical className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div id="reader" className="w-full max-w-[350px] aspect-square rounded-2xl overflow-hidden border-2 border-primary/30 relative">
            {/* The scanner will render here */}
            {!scanResult && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -mb-1 -mr-1"></div>
                <div className="w-full h-0.5 bg-primary absolute top-1/2 left-0 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_theme('colors.primary.DEFAULT')]"></div>
              </div>
            )}
          </div>
          
          {scanResult ? (
            <div className="mt-8 p-4 bg-white/10 rounded-xl max-w-full overflow-hidden text-ellipsis animate-fade-in-up">
              <p className="text-xs text-white/60 mb-1">Result:</p>
              <p className="text-sm font-mono break-all">{scanResult}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg text-xs font-bold"
              >
                Scan Again
              </button>
            </div>
          ) : (
            <p className="mt-8 text-sm text-white/80 font-medium animate-fade-in-up">Point at any QR code to pay</p>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-center gap-12 pb-12 pt-6 bg-gradient-to-t from-black to-transparent">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Gallery</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <Flashlight className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Flash</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">My QR</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ScanQR;
