
// Perplexity Sonar Reasoning API service for hackathon project
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface SentimentAnalysisResult {
  sentiment: "positive" | "neutral" | "negative";
  reason: string;
}

// Analyze sentiment using Perplexity Sonar Reasoning API
export const analyzeSentiment = async (text: string): Promise<"positive" | "neutral" | "negative"> => {
  try {
    console.log("Analyzing sentiment with Perplexity Sonar for:", text.substring(0, 50) + "...");
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "perplexity/sonar-reasoning",
        messages: [
          {
            role: "user",
            content: `Classify this social media post as Positive, Neutral, or Negative with a brief reason: "${text}"`
          }
        ]
      })
    });

    if (!response.ok) {
      console.error("Perplexity API error:", response.status, response.statusText);
      return "neutral"; // Fallback
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "";
    
    console.log("Perplexity Sonar response:", responseText);
    
    // Parse the response to extract sentiment
    const lowerResponse = responseText.toLowerCase();
    
    if (lowerResponse.includes("positive")) {
      return "positive";
    } else if (lowerResponse.includes("negative")) {
      return "negative";
    } else {
      return "neutral";
    }
  } catch (error) {
    console.error("Error analyzing sentiment with Perplexity Sonar:", error);
    return "neutral"; // Default fallback
  }
};

// Enhanced sentiment analysis that returns both sentiment and reasoning
export const analyzeSentimentWithReason = async (text: string): Promise<SentimentAnalysisResult> => {
  try {
    console.log("Analyzing sentiment with reasoning using Perplexity Sonar for:", text.substring(0, 50) + "...");
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "perplexity/sonar-reasoning",
        messages: [
          {
            role: "user",
            content: `Classify this social media post as Positive, Neutral, or Negative and provide a brief reason why. Format your response as "Classification: [Positive/Neutral/Negative] - Reason: [your explanation]": "${text}"`
          }
        ]
      })
    });

    if (!response.ok) {
      console.error("Perplexity API error:", response.status, response.statusText);
      return { sentiment: "neutral", reason: "Unable to analyze" };
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "";
    
    console.log("Perplexity Sonar reasoning response:", responseText);
    
    // Parse the response to extract sentiment and reason
    const lowerResponse = responseText.toLowerCase();
    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    
    if (lowerResponse.includes("positive")) {
      sentiment = "positive";
    } else if (lowerResponse.includes("negative")) {
      sentiment = "negative";
    }
    
    // Extract reason from the response
    const reasonMatch = responseText.match(/reason:\s*(.+)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : "AI analysis completed";
    
    return { sentiment, reason };
  } catch (error) {
    console.error("Error analyzing sentiment with reasoning:", error);
    return { sentiment: "neutral", reason: "Analysis unavailable" };
  }
};

// Legacy compatibility functions
export const setApiKey = (apiKey: string): void => {
  // No longer needed but kept for compatibility
};

export const hasApiKey = (): boolean => {
  return !!OPENROUTER_API_KEY;
};
