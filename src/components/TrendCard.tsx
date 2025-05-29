
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import SentimentBadge from "./SentimentBadge";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface TrendCardProps {
  id: string;
  username: string;
  handle: string;
  avatarUrl: string;
  content: string;
  timestamp: Date;
  sentiment: "positive" | "neutral" | "negative";
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  source: string;
}

const TrendCard = ({
  username,
  handle,
  avatarUrl,
  content,
  timestamp,
  sentiment,
  metrics,
  source,
}: TrendCardProps) => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <img src={avatarUrl} alt={username} />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">@{handle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <SentimentBadge sentiment={sentiment} />
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground pt-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Heart className="h-3.5 w-3.5 mr-1" />
            {metrics.likes.toLocaleString()}
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {metrics.comments.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Share2 className="h-3.5 w-3.5 mr-1" />
            {metrics.shares.toLocaleString()}
          </div>
        </div>
        <div className="text-xs">{source}</div>
      </CardFooter>
    </Card>
  );
};

export default TrendCard;
