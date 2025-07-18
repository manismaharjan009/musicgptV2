import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");

    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          error:
            "Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.",
        },
        { status: 400 }
      );
    }

    const voiceDataPath = path.join(process.cwd(), "voice.json");
    const voiceData = JSON.parse(fs.readFileSync(voiceDataPath, "utf8"));

    const voices = voiceData.data;
    const totalVoices = voices.length;
    const totalPages = Math.ceil(totalVoices / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVoices = voices.slice(startIndex, endIndex);

    const response = {
      data: paginatedVoices,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalVoices,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error reading voice data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
