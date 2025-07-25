import { NextRequest, NextResponse } from "next/server";
import { PersonsApi } from "pipedrive/v1";
import { createPipedriveApi } from "@/lib/pipedrive";

export async function GET(request: NextRequest) {
  try {
    const { api, isAuthenticated, authUrl } = await createPipedriveApi(
      PersonsApi
    );

    // Handle unauthenticated case
    if (!isAuthenticated) {
      return NextResponse.redirect(authUrl!);
    }

    const response = await api.getPersons();

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error fetching persons:", error);
    return NextResponse.json(
      { error: "Failed to fetch persons" },
      { status: 500 }
    );
  }
}

