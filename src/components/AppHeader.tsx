
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="bg-primary text-white px-2 py-1 rounded-md font-bold">HYPE</span>
            <span className="font-semibold text-xl">Lens</span>
          </div>
          <span className="text-xs bg-secondary rounded-full px-2 py-0.5">BETA</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
