import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import WorldcoinButton from "@/components/WorldcoinButton";
import LogsDialog from "@/components/LogsDialog";

interface Cast {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  recasts: number;
  replies: number;
}

const mockCasts: Cast[] = [
  {
    id: "1",
    username: "vitalik",
    displayName: "Vitalik Buterin",
    avatar: "https://picsum.photos/200",
    content: "Just published a new post about rollups and the future of Ethereum scaling!",
    timestamp: "2 hours ago",
    likes: 423,
    recasts: 89,
    replies: 56,
  },
  {
    id: "2",
    username: "farcaster",
    displayName: "Farcaster",
    avatar: "https://picsum.photos/200?random=1",
    content: "Excited to announce our latest protocol update with improved performance and new features.",
    timestamp: "5 hours ago",
    likes: 328,
    recasts: 104,
    replies: 42,
  },
  {
    id: "3",
    username: "worldcoin",
    displayName: "Worldcoin",
    avatar: "https://picsum.photos/200?random=2",
    content: "Building a more inclusive and privacy-focused digital identity system for everyone.",
    timestamp: "1 day ago",
    likes: 512,
    recasts: 201,
    replies: 78,
  }
];

const Index = () => {
  const [newCast, setNewCast] = useState("");
  const [casts, setCasts] = useState<Cast[]>(mockCasts);
  const [isWorldIDVerified, setIsWorldIDVerified] = useState(false);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCast.trim()) return;

    const cast: Cast = {
      id: Date.now().toString(),
      username: "you",
      displayName: "Your Name",
      avatar: "https://picsum.photos/200?random=3",
      content: newCast,
      timestamp: "Just now",
      likes: 0,
      recasts: 0,
      replies: 0,
    };

    setCasts([cast, ...casts]);
    setNewCast("");
    toast({
      title: "Cast created",
      description: "Your cast has been published successfully.",
    });
  };

  const handleWorldcoinSuccess = () => {
    setIsWorldIDVerified(true);
    toast({
      title: "World ID Connected",
      description: "You have successfully verified with World ID.",
    });
  };

  const handleWorldcoinError = (error: Error) => {
    console.error("World ID verification error:", error);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">Worldcaster</h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setLogsDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Show Logs
              </Button>
              <WorldcoinButton 
                onSuccess={handleWorldcoinSuccess}
                onError={handleWorldcoinError}
              />
            </div>
          </div>
        </div>
      </header>

      {isWorldIDVerified && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 mx-auto max-w-2xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Verified with World ID! You now have full access to Worldcaster features.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow mb-8 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="What's happening?"
                value={newCast}
                onChange={(e) => setNewCast(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Cast
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {casts.map((cast) => (
            <div key={cast.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={cast.avatar} 
                    alt={cast.displayName}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-gray-900 truncate">
                      {cast.displayName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      @{cast.username}
                    </p>
                    <span className="text-sm text-gray-400">•</span>
                    <p className="text-sm text-gray-500">
                      {cast.timestamp}
                    </p>
                  </div>
                  <p className="text-gray-800 mt-1">{cast.content}</p>
                  <div className="flex items-center space-x-6 mt-3">
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span>{cast.replies}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-500">
                      <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>{cast.recasts}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-red-500">
                      <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      <span>{cast.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <LogsDialog isOpen={logsDialogOpen} onOpenChange={setLogsDialogOpen} />
    </div>
  );
};

export default Index;
