
import { useRef } from "react";
import TrendingTag from "./TrendingTag";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrendingTagsListProps {
  tags: { tag: string; count: number }[];
  onTagClick: (tag: string) => void;
  className?: string;
}

const TrendingTagsList = ({ tags, onTagClick, className }: TrendingTagsListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.75;
      
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => scroll("left")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-none"
      >
        {tags.map((item) => (
          <TrendingTag
            key={item.tag}
            tag={item.tag}
            count={item.count}
            onClick={() => onTagClick(item.tag)}
          />
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => scroll("right")}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TrendingTagsList;
