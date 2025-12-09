import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIGeneratedResponse, TemplateType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCardFromConcept = async (concept: string): Promise<AIGeneratedResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      cardInfo: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Korean name" },
          englishName: { type: Type.STRING, description: "Romanized English name (e.g. Park, Sung Don)" },
          title: { type: Type.STRING, description: "Job title" },
          companyName: { type: Type.STRING, description: "Company name in Korean" },
          englishCompanyName: { type: Type.STRING, description: "Company name in English" },
          businessTagline: { type: Type.STRING, description: "3-4 lines of business items or slogans" },
          phone: { type: Type.STRING, description: "Mobile Phone number" },
          companyPhone: { type: Type.STRING, description: "Company Landline number (Tel)" },
          fax: { type: Type.STRING, description: "Fax number" },
          email: { type: Type.STRING, description: "Email address" },
          website: { type: Type.STRING, description: "Website URL" },
          address: { type: Type.STRING, description: "Address in Korean" },
          englishAddress: { type: Type.STRING, description: "Address in English" },
        },
        required: ["name", "englishName", "title", "companyName", "englishCompanyName", "businessTagline", "phone", "companyPhone", "email", "website", "address", "englishAddress"],
      },
      designStyle: {
        type: Type.OBJECT,
        properties: {
          template: { type: Type.STRING, enum: Object.values(TemplateType) },
          primaryColor: { type: Type.STRING, description: "Hex color code" },
          secondaryColor: { type: Type.STRING, description: "Hex color code" },
          textColor: { type: Type.STRING, description: "Hex color code" },
          backgroundColor: { type: Type.STRING, description: "Hex color code" },
        },
        required: ["template", "primaryColor", "secondaryColor", "textColor", "backgroundColor"],
      },
      rationale: { type: Type.STRING, description: "Brief explanation of design choices" }
    },
    required: ["cardInfo", "designStyle", "rationale"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Design a business card for: "${concept}". Generate appropriate Korean and English details.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as AIGeneratedResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};