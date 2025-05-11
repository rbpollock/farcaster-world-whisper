
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { verify } from "@worldcoin/minikit-js";

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

  const handleClick = async () => {
    setIsVerifying(true);
    try {
      const result = await verify({
        // Optional app name to display during verification
        app_name: "Worldcaster",
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
