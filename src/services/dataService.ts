import { TrendCardProps } from "@/components/TrendCard";
import { analyzeSentiment } from "./perplexityService";

// Twitter/X API base URL
const TWITTER_API_BASE_URL = "https://api.twitter.com/2";

// For demo purposes, we'll use mock data since we don't have a backend to store API keys securely
const TWITTER_API_TOKEN = ""; // This would need to be set up with a proper backend

// Fetch real trending content from Twitter/X API
export const searchTrends = async (query: string, type: string): Promise<TrendCardProps[]> => {
  try {
    // Since we don't have a secure way to store API keys in a frontend app,
    // we'll use mock data for demonstration but with real Perplexity Sonar analysis
    if (!TWITTER_API_TOKEN) {
      console.log("Using mock data with real Perplexity Sonar sentiment analysis");
      return generateMockResults(query, type);
    }

    // Define endpoint and parameters based on search type
    let endpoint = "";
    let params = {};
    
    if (type === "hashtag") {
      endpoint = "/tweets/search/recent";
      params = {
        query: `#${query}`,
        max_results: 10,
        "tweet.fields": "created_at,public_metrics",
        expansions: "author_id",
        "user.fields": "name,username,profile_image_url"
      };
    } else {
      endpoint = "/users/by/username";
      params = {
        usernames: query.replace('@', ''),
      };
    }
    
    // Construct request URL with query parameters
    const url = new URL(`${TWITTER_API_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    // Make request to Twitter/X API
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TWITTER_API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      // If API request fails, fall back to mock data for demonstration
      console.error("Twitter API error:", response.status);
      return generateMockResults(query, type);
    }

    const data = await response.json();
    
    // Transform Twitter API response to our app's format
    let results: TrendCardProps[] = [];
    
    if (type === "hashtag") {
      // Process hashtag search results
      results = data.data.map((tweet: any, index: number) => {
        const user = data.includes.users.find((u: any) => u.id === tweet.author_id);
        return {
          id: tweet.id,
          username: user?.name || `User${index}`,
          handle: user?.username || `user${index}`,
          avatarUrl: user?.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}${index}`,
          content: tweet.text,
          timestamp: new Date(tweet.created_at),
          sentiment: "neutral", // Will be updated with analyzeSentiment
          metrics: {
            likes: tweet.public_metrics?.like_count || 0,
            comments: tweet.public_metrics?.reply_count || 0, 
            shares: tweet.public_metrics?.retweet_count || 0,
          },
          source: "Twitter",
        };
      });
    } else {
      // Process user search results (get their recent tweets)
      const userId = data.data[0]?.id;
      if (userId) {
        // Make another request to get user's tweets
        const tweetsUrl = new URL(`${TWITTER_API_BASE_URL}/users/${userId}/tweets`);
        tweetsUrl.searchParams.append("max_results", "10");
        tweetsUrl.searchParams.append("tweet.fields", "created_at,public_metrics");
        
        const tweetsResponse = await fetch(tweetsUrl.toString(), {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${TWITTER_API_TOKEN}`,
            "Content-Type": "application/json"
          }
        });
        
        if (tweetsResponse.ok) {
          const tweetsData = await tweetsResponse.json();
          const user = data.data[0];
          
          results = tweetsData.data.map((tweet: any) => ({
            id: tweet.id,
            username: user.name,
            handle: user.username,
            avatarUrl: user.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}`,
            content: tweet.text,
            timestamp: new Date(tweet.created_at),
            sentiment: "neutral", // Will be updated with analyzeSentiment
            metrics: {
              likes: tweet.public_metrics?.like_count || 0,
              comments: tweet.public_metrics?.reply_count || 0,
              shares: tweet.public_metrics?.retweet_count || 0,
            },
            source: "Twitter",
          }));
        }
      }
    }
    
    // If no results from API or error occurred, fall back to mock data
    if (results.length === 0) {
      return generateMockResults(query, type);
    }
    
    // Process each result with Perplexity Sonar sentiment analysis
    for (let i = 0; i < results.length; i++) {
      results[i].sentiment = await analyzeSentiment(results[i].content);
    }
    
    return results;
  } catch (error) {
    console.error("Error fetching trends:", error);
    // Fall back to mock data with Perplexity analysis
    return generateMockResults(query, type);
  }
};

// Generate mock results with real Perplexity Sonar sentiment analysis
const generateMockResults = async (query: string, type: string): Promise<TrendCardProps[]> => {
  const mockPosts = [
    {
      content: type === "hashtag" 
        ? `Just discovered this amazing new AI tool that's revolutionizing how we work! #${query} is definitely the future of productivity. Can't wait to see what comes next!`
        : `@${query} just shared some incredible insights about the future of technology. Their perspective on innovation is always refreshing and thought-provoking.`,
      baseMetrics: { likes: 890, comments: 156, shares: 78 }
    },
    {
      content: type === "hashtag"
        ? `Honestly not sure about all this hype around #${query}. Seems like another tech bubble to me. Hope I'm wrong but staying cautious for now.`
        : `@${query} I have to disagree with your latest post. The data doesn't seem to support those claims. Would love to see more evidence before jumping to conclusions.`,
      baseMetrics: { likes: 234, comments: 89, shares: 23 }
    },
    {
      content: type === "hashtag"
        ? `Currently researching #${query} for my thesis. Interesting developments but still need more concrete data to draw any conclusions. The field is evolving rapidly.`
        : `@${query} Thanks for sharing those resources! Very helpful for my current project. Looking forward to implementing some of these concepts.`,
      baseMetrics: { likes: 445, comments: 67, shares: 34 }
    },
    {
      content: type === "hashtag"
        ? `This #${query} trend is absolutely incredible! Just tried it myself and the results exceeded all expectations. Highly recommend everyone gives it a shot!`
        : `@${query} Your latest work is inspiring! The creativity and innovation you bring to every project is remarkable. Keep pushing boundaries!`,
      baseMetrics: { likes: 1203, comments: 234, shares: 156 }
    },
    {
      content: type === "hashtag"
        ? `Really disappointed with the #${query} experience. Technical issues, poor support, and overpromised features. Expected much better given all the marketing.`
        : `@${query} I'm concerned about the direction this is heading. The recent changes seem to prioritize profit over user experience. Hope this gets addressed soon.`,
      baseMetrics: { likes: 167, comments: 98, shares: 12 }
    },
    {
      content: type === "hashtag"
        ? `Neutral take on #${query}: It has potential but needs refinement. Some features work well, others need improvement. Worth monitoring development.`
        : `@${query} Interesting perspective on the latest industry trends. Your analysis provides good balance between optimism and realism. Thanks for sharing.`,
      baseMetrics: { likes: 334, comments: 45, shares: 28 }
    }
  ];

  const results: TrendCardProps[] = [];
  
  for (let i = 0; i < 6; i++) {
    const post = mockPosts[i];
    const sentiment = await analyzeSentiment(post.content);
    
    results.push({
      id: `${query}-${i}`,
      username: type === "hashtag" ? `TrendUser${i + 1}` : query.replace('@', ''),
      handle: type === "hashtag" ? `trenduser${i + 1}` : query.replace('@', ''),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}${i}`,
      content: post.content,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      sentiment: sentiment,
      metrics: {
        likes: post.baseMetrics.likes + Math.floor(Math.random() * 200),
        comments: post.baseMetrics.comments + Math.floor(Math.random() * 50),
        shares: post.baseMetrics.shares + Math.floor(Math.random() * 20),
      },
      source: "Powered by Perplexity Sonar",
    });
  }
  
  return results;
};
