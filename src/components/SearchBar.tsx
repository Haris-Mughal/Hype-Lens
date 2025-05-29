
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("hashtag"); // hashtag or handle

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={type === "hashtag" ? "Search for #trending topics..." : "Search for @handles..."}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={type === "hashtag" ? "default" : "outline"}
            onClick={() => setType("hashtag")}
          >
            #Hashtag
          </Button>
          <Button
            type="button"
            variant={type === "handle" ? "default" : "outline"}
            onClick={() => setType("handle")}
          >
            @Handle
          </Button>
          <Button type="submit">Search</Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
