
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ErudaToggleProps {
  className?: string;
}

const ErudaToggle = ({ className = "" }: ErudaToggleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if eruda is initialized and get initial state
    if (window.eruda) {
      setIsVisible(window.eruda._isShow);
    }
  }, []);

  const toggleEruda = () => {
    if (window.eruda) {
      if (isVisible) {
        window.eruda.hide();
      } else {
        window.eruda.show();
      }
      setIsVisible(!isVisible);
    } else {
      console.error("Eruda is not initialized");
    }
  };

  // Don't render if eruda is not available
  if (!window.eruda) return null;

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
