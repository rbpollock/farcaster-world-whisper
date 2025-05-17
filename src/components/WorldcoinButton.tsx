
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import LogsDialog from "./LogsDialog";

// Define the verification response type
interface VerificationResponse {
  success: boolean;
  message?: string;
}

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
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);

  // This would be your API endpoint for verifying the proof
  const verifyProof = async (proof: ISuccessResult): Promise<VerificationResponse> => {
    console.log("Verification proof received:", proof);
    
    // In a real implementation, you would send this to your backend
    // For demo purposes, we'll simulate a successful verification
    return {
      success: true,
      message: "Verification successful"
    };
  };

  const handleSuccess = async (result: ISuccessResult) => {
    setIsVerifying(true);
    console.log("WorldID verification successful", result);
    
    try {
      // Send the proof to your backend for verification
      const response = await verifyProof(result);
      
      if (response.success) {
        toast({
          title: "Verification Successful",
          description: "Your World ID has been verified successfully.",
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      
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

  const handleError = (error: Error) => {
    console.error("IDKit error:", error);
    if (onError) {
      onError(error);
    }
    toast({
      title: "Verification Error",
      description: error.message || "There was an error with World ID verification.",
      variant: "destructive",
    });
  };

  return (
    <>
      <IDKitWidget
        app_id="app_staging_90261c59eb13380d5a2def963618c6a5" // Replace with your app_id from the World ID Dashboard
        action="worldcaster-auth" // This represents the action users are performing
        onSuccess={handleSuccess}
        handleVerify={verifyProof}
        enableTelemetry
      >
        {({ open }) => (
          <Button 
            onClick={() => {
              setLogsDialogOpen(true);
              open();
            }}
            className={`bg-purple-600 hover:bg-purple-700 ${className}`}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Connect with World ID"}
          </Button>
        )}
      </IDKitWidget>
      <LogsDialog isOpen={logsDialogOpen} onOpenChange={setLogsDialogOpen} />
    </>
  );
};

export default WorldcoinButton;
