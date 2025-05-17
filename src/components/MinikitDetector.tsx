
import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { Circle, CircleCheck, CircleX } from "lucide-react";

type MinikitStatus = "checking" | "available" | "unavailable";

const MinikitDetector = () => {
  const [status, setStatus] = useState<MinikitStatus>("checking");

  useEffect(() => {
    const checkMinikit = async () => {
      try {
        // First check if the MiniKit object exists in the window
        if (typeof window !== "undefined" && "MiniKit" in window) {
          console.log("MiniKit global object found in window");
          
          // Try to use MiniKit.isInstalled() as a deeper check
          try {
            const isInstalled = MiniKit.isInstalled();
            console.log("MiniKit.isInstalled() result:", isInstalled);
            
            if (isInstalled) {
              setStatus("available");
            } else {
              setStatus("unavailable");
              console.log("MiniKit.isInstalled() returned false");
            }
          } catch (error) {
            console.error("Error calling MiniKit.isInstalled():", error);
            setStatus("unavailable");
          }
        } else {
          console.log("MiniKit global object NOT found in window");
          setStatus("unavailable");
        }
      } catch (error) {
        console.error("Error checking MiniKit:", error);
        setStatus("unavailable");
      }
    };
    
    // Check on mount and every 5 seconds
    checkMinikit();
    const interval = setInterval(checkMinikit, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2" title={`MiniKit is ${status}`}>
      {status === "checking" && (
        <Circle className="text-yellow-500 animate-pulse" />
      )}
      {status === "available" && (
        <CircleCheck className="text-green-500" />
      )}
      {status === "unavailable" && (
        <CircleX className="text-red-500" />
      )}
      <span className="text-sm hidden sm:inline-block">
        {status === "checking" && "Checking MiniKit..."}
        {status === "available" && "MiniKit Available"}
        {status === "unavailable" && "MiniKit Unavailable"}
      </span>
    </div>
  );
};

export default MinikitDetector;
