
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ErudaToggleProps {
  className?: string;
}

const ErudaToggle = ({ className = "" }: ErudaToggleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if eruda is initialized and get initial state
    if (typeof window !== 'undefined' && window.eruda) {
      // Use a safer way to check visibility
      try {
        setIsVisible(!!window.eruda._isShow);
      } catch (e) {
        console.log("Could not determine eruda visibility state", e);
      }
    }
  }, []);

  const toggleEruda = () => {
    if (typeof window !== 'undefined' && window.eruda) {
      try {
        if (isVisible) {
          window.eruda.hide();
        } else {
          window.eruda.show();
        }
        setIsVisible(!isVisible);
      } catch (e) {
        console.error("Error toggling eruda", e);
      }
    } else {
      console.error("Eruda is not initialized");
    }
  };

  // Don't render if eruda is not available
  if (typeof window === 'undefined' || !window.eruda) return null;

  return (
    <Button 
      onClick={toggleEruda}
      className={`bg-gray-600 hover:bg-gray-700 ${className}`}
      size="sm"
    >
      {isVisible ? "Hide Debug" : "Show Debug"}
    </Button>
  );
};

export default ErudaToggle;
