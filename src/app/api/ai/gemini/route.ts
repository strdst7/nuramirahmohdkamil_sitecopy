import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt, temperature, image } = body as {
      prompt?: string;
      temperature?: number;
      image?: string;
    };

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return Response.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: typeof temperature === "number"
        ? Math.max(0, Math.min(1, temperature))
        : 0.7,
    };

    let result;

    if (image) {
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      if (!base64Data || base64Data.length === 0) {
        return Response.json(
          { error: "Invalid image data" },
          { status: 400 }
        );
      }

      result = await model.generateContent([
        { text: prompt },
        { inlineData: { mimeType, data: base64Data } },
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    return Response.json({ content: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error from Gemini API";
    const status =
      (error as { status?: number }).status === 429 ? 429
      : (error as { status?: number }).status === 401 ? 401
      : 500;
    return Response.json({ error: message }, { status });
  }
}
