
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SentimentType = "positive" | "neutral" | "negative";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  className?: string;
}

const SentimentBadge = ({ sentiment, className }: SentimentBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800": sentiment === "positive",
          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800": sentiment === "neutral",
          "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800": sentiment === "negative",
        },
        className
      )}
    >
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </Badge>
  );
};

export default SentimentBadge;
