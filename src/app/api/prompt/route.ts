import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, toolOption } = body;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    let response;
    switch (toolOption) {
      case "create-anything":
        response = {
          success: true,
          message: "Song creation started",
          data: {
            id: `song_${Date.now()}`,
            prompt: prompt,
            status: "completed",
            estimatedTime: "2-3 minutes",
            type: "song_creation",
          },
        };
        break;

      case "text-to-speech":
        response = {
          success: true,
          message: "Text-to-speech conversion started",
          data: {
            id: `tts_${Date.now()}`,
            prompt: prompt,
            status: "completed",
            estimatedTime: "30-60 seconds",
            type: "text_to_speech",
          },
        };
        break;

      default:
        response = {
          success: true,
          message: "Processing started",
          data: {
            id: `task_${Date.now()}`,
            prompt: prompt,
            status: "completed",
            estimatedTime: "1-2 minutes",
            type: "general",
          },
        };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing prompt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
