// Mock data for the application

import { searchTrends } from "@/services/dataService";
import { TrendCardProps } from "@/components/TrendCard";

// Mock trending tags
export const mockTrendingTags = [
  { tag: "#AI", count: 1245 },
  { tag: "#MachineLearning", count: 876 },
  { tag: "#DataScience", count: 654 },
  { tag: "#Python", count: 432 },
  { tag: "#JavaScript", count: 321 },
  { tag: "#React", count: 234 },
  { tag: "#WebDev", count: 123 },
  { tag: "#Technology", count: 98 },
  { tag: "#Innovation", count: 76 },
  { tag: "#Design", count: 54 },
];

// Mock trend cards
export const mockTrendCards: TrendCardProps[] = [
  {
    id: "1",
    username: "TechGuru",
    handle: "techguru",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechGuru",
    content: "The future is here! Just witnessed an AI demo that blew my mind. #AI #Innovation",
    timestamp: new Date(),
    sentiment: "positive",
    metrics: {
      likes: 1234,
      comments: 123,
      shares: 45,
    },
    source: "Twitter",
  },
  {
    id: "2",
    username: "DataWizard",
    handle: "datawizard",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataWizard",
    content: "Analyzing the latest trends in data science. The insights are fascinating! #DataScience #BigData",
    timestamp: new Date(Date.now() - 3600000),
    sentiment: "neutral",
    metrics: {
      likes: 567,
      comments: 67,
      shares: 23,
    },
    source: "LinkedIn",
  },
  {
    id: "3",
    username: "CodeNinja",
    handle: "codeninja",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja",
    content: "Just finished a new React project. Loving the component-based architecture! #ReactJS #WebDev",
    timestamp: new Date(Date.now() - 7200000),
    sentiment: "positive",
    metrics: {
      likes: 789,
      comments: 89,
      shares: 34,
    },
    source: "GitHub",
  },
];

// Search mock data function that uses our data service
export const searchMockData = async (query: string, type: string): Promise<TrendCardProps[]> => {
  return searchTrends(query, type);
};
