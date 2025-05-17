
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import LogsDialog from "./LogsDialog";

interface WorldcoinButtonProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const WorldcoinButton = ({ 
  onSuccess, 
  onError,
  className = "" 
}: WorldcoinButtonProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMinikitAvailable, setIsMinikitAvailable] = useState<boolean | null>(null);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);

  useEffect(() => {
    // Check if MiniKit is available on component mount
    const checkMinikitAvailability = async () => {
      try {
        // First check if the MiniKit object exists in the window
        if (typeof window !== "undefined" && "MiniKit" in window) {
          console.log("MiniKit global object found in window");
          
          // Try to use MiniKit.isInstalled() as a deeper check
          try {
            const isInstalled = MiniKit.isInstalled();
            console.log("MiniKit.isInstalled() result:", isInstalled);
            setIsMinikitAvailable(isInstalled);
          } catch (error) {
            console.error("Error calling MiniKit.isInstalled():", error);
            setIsMinikitAvailable(false);
          }
        } else {
          console.log("MiniKit global object NOT found in window");
          setIsMinikitAvailable(false);
        }
      } catch (error) {
        console.error("Error checking MiniKit availability:", error);
        setIsMinikitAvailable(false);
      }
    };
    
    checkMinikitAvailability();
  }, []);

  const handleClick = async () => {
    setIsVerifying(true);
    console.log("WorldcoinButton clicked");
    // Show logs dialog when button is clicked
    setLogsDialogOpen(true);
    
    try {
      // Check if MiniKit is installed
      if (!("MiniKit" in window)) {
        console.log("MiniKit not found in window object");
        toast({
          title: "Worldcoin Not Available",
          description: "MiniKit is not available in the browser environment.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }
      
      // Double check with isInstalled
      if (!MiniKit.isInstalled()) {
        console.log("MiniKit.isInstalled() returned false");
        toast({
          title: "Worldcoin Not Available",
          description: "Please ensure you're running inside the World App environment.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }
      
      console.log("MiniKit installed, proceeding with authentication");
      
      // For demo purposes, we'll create a mock nonce
      // In a real app, you would fetch this from your backend
      const nonce = Math.random().toString(36).substring(2, 15);
      console.log("Generated nonce:", nonce);
      
      const { commandPayload, finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: '0', // Optional
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: 'Verify your identity with Worldcoin to use Worldcaster',
      });
      
      console.log("Authentication successful", { commandPayload, finalPayload });
      
      // Handle successful verification
      toast({
        title: "Verification Successful",
        description: "Your World ID has been verified successfully.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Verification error:", error);
      
      // Handle verification error
      toast({
        title: "Verification Failed",
        description: "There was an issue verifying your World ID.",
        variant: "destructive",
      });
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // If we haven't determined MiniKit availability yet, show a default state
  if (isMinikitAvailable === null) {
    return (
      <>
        <Button 
          className={`bg-purple-600 hover:bg-purple-700 ${className}`}
          disabled={true}
        >
          Checking Worldcoin...
        </Button>
        <LogsDialog isOpen={logsDialogOpen} onOpenChange={setLogsDialogOpen} />
      </>
    );
  }

  return (
    <>
      <Button 
        onClick={handleClick}
        className={`bg-purple-600 hover:bg-purple-700 ${className}`}
        disabled={isVerifying}
      >
        {isVerifying ? "Verifying..." : "Connect with Worldcoin"}
      </Button>
      <LogsDialog isOpen={logsDialogOpen} onOpenChange={setLogsDialogOpen} />
    </>
  );
};

export default WorldcoinButton;
