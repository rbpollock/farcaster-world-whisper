
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  type: 'log' | 'error' | 'info' | 'warn';
  message: string;
  timestamp: Date;
}

interface LogsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogsDialog = ({ isOpen, onOpenChange }: LogsDialogProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const originalConsole = {
      log: console.log,
      error: console.error,
      info: console.info,
      warn: console.warn
    };

    // Override console methods
    console.log = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prev => [...prev, { 
        type: 'log',
        message,
        timestamp: new Date()
      }]);
      
      originalConsole.log(...args);
    };

    console.error = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prev => [...prev, { 
        type: 'error',
        message,
        timestamp: new Date()
      }]);
      
      originalConsole.error(...args);
    };

    console.info = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prev => [...prev, { 
        type: 'info',
        message, 
        timestamp: new Date()
      }]);
      
      originalConsole.info(...args);
    };

    console.warn = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prev => [...prev, { 
        type: 'warn',
        message,
        timestamp: new Date()
      }]);
      
      originalConsole.warn(...args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Console Logs</DialogTitle>
          <DialogDescription>
            Displaying captured console logs and errors
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-2">
          <Button size="sm" variant="outline" onClick={clearLogs}>
            Clear
          </Button>
        </div>

        <ScrollArea className="flex-1 border rounded p-2 bg-gray-50 h-[50vh]">
          {logs.length === 0 ? (
            <div className="text-gray-500 italic p-2">No logs yet</div>
          ) : (
            <div className="space-y-2 font-mono text-sm">
              {logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded ${
                    log.type === 'error' 
                      ? 'bg-red-100 text-red-800' 
                      : log.type === 'warn'
                        ? 'bg-yellow-100 text-yellow-800'
                        : log.type === 'info'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white border'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{formatTime(log.timestamp)}</span>
                    <span className="text-xs uppercase font-bold">{log.type}</span>
                  </div>
                  <pre className="whitespace-pre-wrap break-all">{log.message}</pre>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LogsDialog;
