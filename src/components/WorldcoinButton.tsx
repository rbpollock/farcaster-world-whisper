
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMiniKit } from "@worldcoin/minikit-react";

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
  const minikit = useMiniKit();

  const handleClick = async () => {
    setIsVerifying(true);
    
    try {
      // Check if MiniKit is installed
      if (!minikit.isInstalled) {
        toast({
          title: "Worldcoin Not Available",
          description: "Please install the Worldcoin app to continue.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }
      
      // For demo purposes, we'll create a mock nonce
      // In a real app, you would fetch this from your backend
      const nonce = Math.random().toString(36).substring(2, 15);
      
      const { commandPayload, finalPayload } = await minikit.walletAuth({
        nonce: nonce,
        requestId: '0', // Optional
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: 'Verify your identity with Worldcoin to use Worldcaster',
      });
      
      // Handle successful verification
      toast({
        title: "Verification Successful",
        description: "Your World ID has been verified successfully.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
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

  return (
    <Button 
      onClick={handleClick}
      className={`bg-purple-600 hover:bg-purple-700 ${className}`}
      disabled={isVerifying}
    >
      {isVerifying ? "Verifying..." : "Connect with Worldcoin"}
    </Button>
  );
};

export default WorldcoinButton;
