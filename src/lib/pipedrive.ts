import { OAuth2Configuration, Configuration } from "pipedrive/v1";
import { cookies } from "next/headers";

// Centralized OAuth2 configuration
const createOAuth2Config = () => {
  return new OAuth2Configuration({
    clientId: process.env.PIPEDRIVE_CLIENT_ID || "",
    clientSecret: process.env.PIPEDRIVE_CLIENT_SECRET || "",
    redirectUri:
      process.env.PIPEDRIVE_REDIRECT_URI ||
      "http://localhost:3000/api/auth/callback",
  });
};

// Token handling interface
interface TokenResult {
  oauth2: OAuth2Configuration;
  apiConfig: Configuration;
  isAuthenticated: boolean;
  authUrl?: string;
}

/**
 * Get Pipedrive API configuration with proper token handling
 * @returns Promise<TokenResult> - Configuration and authentication status
 */
export async function getPipedriveConfig(): Promise<TokenResult> {
  const oauth2 = createOAuth2Config();
  
  // Create apiConfig once, will be updated with proper token if available
  const apiConfig = new Configuration({
    accessToken: oauth2.getAccessToken,
    basePath: oauth2.basePath,
  });
  
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("pipedrive_access_token")?.value;
    
    // Handle null accessToken case
    if (!accessToken) {
      return {
        oauth2,
        apiConfig,
        isAuthenticated: false,
        authUrl: oauth2.authorizationUrl,
      };
    }

    // Parse and update token
    const token = oauth2.updateToken(JSON.parse(accessToken));
    
    // Refresh token if needed
    if (token) {
      await oauth2.tokenRefresh();
    }

    return {
      oauth2,
      apiConfig,
      isAuthenticated: !!token,
    };
  } catch (error) {
    console.error("Error in getPipedriveConfig:", error);
    
    // Return unauthenticated config on error
    return {
      oauth2,
      apiConfig,
      isAuthenticated: false,
      authUrl: oauth2.authorizationUrl,
    };
  }
}

/**
 * Helper to create API instances with proper configuration
 * @param ApiClass - The Pipedrive API class constructor
 * @returns Promise<{ api: T, isAuthenticated: boolean, authUrl?: string }>
 */
export async function createPipedriveApi<T>(
  ApiClass: new (config: Configuration) => T
): Promise<{ api: T; isAuthenticated: boolean; authUrl?: string }> {
  const { apiConfig, isAuthenticated, authUrl } = await getPipedriveConfig();
  
  return {
    api: new ApiClass(apiConfig),
    isAuthenticated,
    authUrl,
  };
} 