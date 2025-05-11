
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { VerificationLevel, IDKitWidget } from "@worldcoin/minikit-js";

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

  const handleVerify = (result: any) => {
    // Handle successful verification
    toast({
      title: "Verification Successful",
      description: "Your World ID has been verified successfully.",
    });
    
    if (onSuccess) {
      onSuccess();
    }
    
    setIsVerifying(false);
  };
  
  const handleError = (error: Error) => {
    // Handle verification error
    toast({
      title: "Verification Failed",
      description: "There was an issue verifying your World ID.",
      variant: "destructive",
    });
    
    if (onError) {
      onError(error);
    }
    
    setIsVerifying(false);
  };

  return (
    <IDKitWidget
      app_id="app_GBkZ1KlJDQhIXJRbLX3whgqR" // This is a placeholder, you should replace with your actual app_id
      action="worldcaster-verify"
      verification_level={VerificationLevel.Device}
      onSuccess={handleVerify}
      onError={handleError}
    >
      {({ open }) => (
        <Button 
          onClick={() => {
            setIsVerifying(true);
            open();
          }}
          className={`bg-purple-600 hover:bg-purple-700 ${className}`}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Connect with Worldcoin"}
        </Button>
      )}
    </IDKitWidget>
  );
};

export default WorldcoinButton;
