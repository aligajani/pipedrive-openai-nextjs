import { NextRequest, NextResponse } from "next/server";
import { OAuth2Configuration } from "pipedrive/v1";
import { cookies } from "next/headers";

const oauth2 = new OAuth2Configuration({
  clientId: process.env.PIPEDRIVE_CLIENT_ID!,
  clientSecret: process.env.PIPEDRIVE_CLIENT_SECRET!,
  redirectUri: process.env.PIPEDRIVE_REDIRECT_URI!,
});

export async function GET(req: NextRequest) {
  try {
    const authCode = req.nextUrl.searchParams.get("code") as string;
    const newAccessToken = await oauth2.authorize(authCode);

    const cookieStore = await cookies();
    cookieStore.set("pipedrive_access_token", JSON.stringify(newAccessToken));

    return NextResponse.redirect(new URL("/", req.url));

  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
