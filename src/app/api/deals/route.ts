import { NextRequest, NextResponse } from "next/server";
import { DealsApi } from "pipedrive/v1";
import { createPipedriveApi } from "@/lib/pipedrive";

export async function GET(request: NextRequest) {
  try {
    const { api, isAuthenticated, authUrl } = await createPipedriveApi(DealsApi);

    // Handle unauthenticated case
    if (!isAuthenticated) {
      return NextResponse.redirect(authUrl!);
    }

    const response = await api.getDeals();

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
} 