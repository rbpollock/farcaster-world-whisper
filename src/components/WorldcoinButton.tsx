
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import LogsDialog from "./LogsDialog";
import { useWorldID } from "@/hooks/useWorldID";

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
  const { setVerified } = useWorldID();

  // This would be your API endpoint for verifying the proof
  const verifyProof = async (proof: ISuccessResult): Promise<VerificationResponse> => {
    console.log("Verification proof received:", proof);
    
    try {
      // In a real implementation, you would make an API call to your backend
      // to verify the proof with World ID's developer API
      
      // For demonstration, we're assuming the proof is valid if we received it
      // In production, you MUST verify this on your backend
      
      if (proof.merkle_root && proof.nullifier_hash && proof.proof) {
        // Store the verification state
        setVerified(true);
        return {
          success: true,
          message: "Verification successful"
        };
      } else {
        throw new Error("Invalid proof structure");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown verification error"
      };
    }
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
        app_id="app_f873643a520d8a274c314e3ba69df542" // Using your provided app_id
        action="worldcaster-auth" // Your action identifier
        onSuccess={handleSuccess}
        handleVerify={verifyProof}
        verification_level={VerificationLevel.Orb} // Require World ID Orb verification
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
