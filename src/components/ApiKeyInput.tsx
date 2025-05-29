
import { useState, useEffect } from "react";
import { setApiKey, hasApiKey } from "@/services/xaiService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const ApiKeyInput = () => {
  const [apiKey, setApiKeyState] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsKeySet(hasApiKey());
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      setIsKeySet(true);
      setShowInput(false);
      toast({
        title: "API Key Saved",
        description: "Your xAI API key has been saved.",
      });
    } else {
      toast({
        title: "Empty API Key",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  const handleClearKey = () => {
    setApiKey("");
    setApiKeyState("");
    setIsKeySet(false);
    setShowInput(true);
    toast({
      title: "API Key Removed",
      description: "Your xAI API key has been removed.",
    });
  };

  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h2 className="text-xl font-medium mb-3">xAI API Settings</h2>
      
      {isKeySet && !showInput ? (
        <div className="space-y-4">
          <Alert>
            <AlertTitle>API Key Configured</AlertTitle>
            <AlertDescription>
              Your xAI API key is set and ready to use. For security, the key is not displayed.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowInput(true)}>
              Change API Key
            </Button>
            <Button variant="destructive" onClick={handleClearKey}>
              Remove API Key
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your xAI API key to enable real-time sentiment analysis of trending content.
            Your API key is stored locally on your device and is never sent to our servers.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              placeholder="Enter your xAI API key"
              className="flex-1"
            />
            <Button onClick={handleSaveKey}>Save API Key</Button>
          </div>
          {isKeySet && (
            <Button variant="ghost" onClick={() => { setShowInput(false); }}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
