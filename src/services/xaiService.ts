
// xaiService.ts - Service for xAI API interactions

// Hardcoded API key for now - will be moved to Supabase secrets
const XAI_API_KEY = 'xai-eNQUBSTHt1rqrz7eqqb4kJQVSK3Ah9T7Fs8olDyXVn2GUzPBc6fziEBqSbarbCoZCdtgWfFUV7mXXY57';

// Analyze sentiment of text using xAI API
export const analyzeSentiment = async (text: string): Promise<"positive" | "neutral" | "negative"> => {
  try {
    if (!XAI_API_KEY) {
      console.error("No xAI API key found");
      return "neutral"; // Default fallback
    }
    
    // This is a placeholder for the actual xAI API call
    // You'll need to replace this with the actual xAI API endpoint and parameters
    const response = await fetch("https://api.xai.com/v1/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        text: text,
        analysis_type: "sentiment"
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Adjust this based on the actual API response structure
    const sentiment = data.sentiment.toLowerCase();
    
    if (sentiment.includes("positive")) return "positive";
    if (sentiment.includes("negative")) return "negative";
    return "neutral";
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "neutral"; // Default fallback
  }
};

// Legacy functions kept for compatibility
export const setApiKey = (apiKey: string): void => {
  // No longer needed but kept for compatibility
};

export const hasApiKey = (): boolean => {
  return !!XAI_API_KEY;
};
