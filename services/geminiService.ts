import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const analyzeWasteImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Identify the main item in this image. Classify it as 'Wet Waste', 'Dry Waste', or 'Recyclable'. Provide a 1-sentence tip on how to dispose of it or recycle it properly. Format: 'Category: [Category] \n Tip: [Tip]'"
          }
        ]
      }
    });
    return response.text || "Could not analyze image.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error analyzing waste. Please try again.";
  }
};

export const analyzeBill = async (base64Image: string, type: 'water' | 'electricity'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this ${type} bill. Extract the total usage amount if visible. Suggest 3 specific ways to reduce this usage based on typical household patterns. Return in JSON format: { "usage": "string", "suggestions": ["string", "string", "string"] }`
          }
        ],
      },
      config: {
        responseMimeType: 'application/json'
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "{}";
  }
};

export const getMobilityComparison = async (start: string, end: string): Promise<string> => {
  try {
    const prompt = `Compare sustainable travel options from ${start} to ${end} (assume a generic city route in India if locations are vague).
    Modes: Car, Bus, Auto Rickshaw, Walking.
    Return valid JSON only with this structure:
    {
      "car": { "co2": number, "time": "string", "desc": "string" },
      "bus": { "co2": number, "time": "string", "transfers": number, "desc": "string" },
      "auto": { "co2": number, "time": "string", "desc": "string" },
      "walk": { "co2": number, "time": "string", "desc": "string" },
      "distance": "string",
      "trafficCondition": "string"
    }
    Values: co2 in kg (number), time (e.g., '15 mins'), desc (e.g., 'Via MG Road' or 'Route 215'), transfers (number, 0 for others).`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini Mobility Error:", error);
    return "{}";
  }
};