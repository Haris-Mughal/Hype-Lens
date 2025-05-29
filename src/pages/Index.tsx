import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import SearchBar from "@/components/SearchBar";
import TrendCard, { TrendCardProps } from "@/components/TrendCard";
import TrendingTagsList from "@/components/TrendingTagsList";
import LoadingIndicator from "@/components/LoadingIndicator";
import { mockTrendCards, mockTrendingTags } from "@/data/mockData";
import { searchTrends } from "@/services/dataService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<TrendCardProps[]>([]);
  const [initialResults, setInitialResults] = useState<TrendCardProps[]>(mockTrendCards);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastQuery, setLastQuery] = useState<{query: string, type: string} | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(60); // seconds

  // Auto-refresh trending data at regular intervals
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoRefresh && lastQuery) {
      intervalId = setInterval(() => {
        console.log(`Auto-refreshing data for ${lastQuery.type === "hashtag" ? "#" : "@"}${lastQuery.query}...`);
        fetchTrends(lastQuery.query, lastQuery.type, true);
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, lastQuery, refreshInterval]);

  const fetchTrends = async (query: string, type: string, isRefresh = false) => {
    if (!isRefresh) {
      setIsSearching(true);
    }
    
    try {
      const results = await searchTrends(query, type);
      setSearchResults(results);
      setHasSearched(true);
      
      if (!isRefresh) {
        if (results.length === 0) {
          toast({
            title: "No results found",
            description: `We couldn't find any results for ${type === "hashtag" ? "#" : "@"}${query}`,
          });
        } else {
          toast({
            title: "Live Data Fetched",
            description: "Showing real-time trending content with AI sentiment analysis.",
          });
        }
      } else if (results.length > 0) {
        toast({
          title: "Data Refreshed",
          description: `Latest trending data for ${type === "hashtag" ? "#" : "@"}${query} has been loaded.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      });
    } finally {
      if (!isRefresh) {
        setIsSearching(false);
      }
    }
  };

  const handleSearch = async (query: string, type: string) => {
    setLastQuery({ query, type });
    await fetchTrends(query, type);
  };

  const handleTagClick = (tag: string) => {
    // Remove the # from the tag
    const query = tag.startsWith("#") ? tag.substring(1) : tag;
    handleSearch(query, "hashtag");
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast({
      title: `Auto-refresh ${!autoRefresh ? "enabled" : "disabled"}`,
      description: !autoRefresh ? `Data will refresh every ${refreshInterval} seconds` : "Real-time updates paused",
    });
  };

  const handleRefreshIntervalChange = (seconds: number) => {
    setRefreshInterval(seconds);
    if (autoRefresh) {
      toast({
        title: "Refresh interval updated",
        description: `Data will refresh every ${seconds} seconds`,
      });
    }
  };

  const displayedResults = hasSearched ? searchResults : initialResults;

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Discover What's <span className="text-primary">Trending</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track viral content with AI-powered sentiment analysis using Perplexity Sonar Reasoning API. 
              Stay ahead of the trend curve with real-time social media insights.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm text-blue-700 dark:text-blue-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Powered by Perplexity Sonar Reasoning
            </div>
          </div>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {hasSearched && lastQuery && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleAutoRefresh}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    autoRefresh 
                      ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" 
                      : "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                  }`}
                >
                  {autoRefresh ? "Auto-refresh: ON" : "Auto-refresh: OFF"}
                </button>
                
                {autoRefresh && (
                  <select 
                    value={refreshInterval}
                    onChange={(e) => handleRefreshIntervalChange(Number(e.target.value))}
                    className="text-sm border rounded-md px-2 py-1 bg-background"
                  >
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                  </select>
                )}
              </div>
              
              {lastQuery && (
                <button 
                  onClick={() => fetchTrends(lastQuery.query, lastQuery.type)}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Refresh Now
                </button>
              )}
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-3">Trending Tags</h2>
            <TrendingTagsList
              tags={mockTrendingTags}
              onTagClick={handleTagClick}
              className="mb-2"
            />
          </div>
          
          {isSearching ? (
            <LoadingIndicator />
          ) : (
            <>
              <h2 className="text-xl font-medium mb-4">
                {hasSearched ? "Search Results" : "Trending Content"}
              </h2>
              
              {displayedResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedResults.map((trend) => (
                    <TrendCard key={trend.id} {...trend} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No results found</p>
                  <p className="text-sm mt-2">Try searching for something else</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 HypeLens - Perplexity Sonar Hackathon Project</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
