import { NextRequest, NextResponse } from "next/server";
import { PersonsApi } from "pipedrive/v1";
import { createPipedriveApi } from "@/lib/pipedrive";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { api, isAuthenticated, authUrl } = await createPipedriveApi(
      PersonsApi
    );

    // Handle unauthenticated case
    if (!isAuthenticated) {
      return NextResponse.redirect(authUrl!);
    }

    const response = await api.deletePerson({
      id: parseInt(params.id)
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error deleting person:", error);
    return NextResponse.json(
      { error: "Failed to delete person" },
      { status: 500 }
    );
  }
} 