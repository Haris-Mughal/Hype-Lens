
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TrendingTagProps {
  tag: string;
  count: number;
  onClick: () => void;
  className?: string;
}

const TrendingTag = ({ tag, count, onClick, className }: TrendingTagProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "text-sm rounded-full hover:bg-accent hover:text-white transition-colors",
        className
      )}
      onClick={onClick}
    >
      {tag}
      {count > 0 && <span className="ml-2 text-xs bg-muted rounded-full px-2">{count}</span>}
    </Button>
  );
};

export default TrendingTag;
