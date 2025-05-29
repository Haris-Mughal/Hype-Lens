
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  className?: string;
}

const LoadingIndicator = ({ className }: LoadingIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-b-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
