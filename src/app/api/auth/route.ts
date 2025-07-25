import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Configuration, Configuration, LeadsApi, PersonsApi } from 'pipedrive/v1';
import { cookies } from 'next/headers';


const oauth2 = new OAuth2Configuration({
  clientId: process.env.PIPEDRIVE_CLIENT_ID || '',
  clientSecret: process.env.PIPEDRIVE_CLIENT_SECRET || '',
  redirectUri: process.env.PIPEDRIVE_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'
});

export async function GET(req: NextRequest) {
  try {

    // method will handle return null if token is not available in the session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('pipedrive_access_token')?.value ?? null;
    const token = oauth2.updateToken(JSON.parse(accessToken));
    const newToken = await oauth2.tokenRefresh();

    // Handle null accessToken case
    if (!token) {
      const authUrl = oauth2.authorizationUrl;
      return NextResponse.redirect(authUrl);
    }

    

    const apiConfig = new Configuration({
        accessToken: oauth2.getAccessToken,
        basePath: oauth2.basePath,
    });


    // token is already set in the session
    // now make API calls as required
    // client will automatically refresh the token when it expires and call the token update callback
    const personsApi = new PersonsApi(apiConfig)

    // // Update the person with the new name and who has ID of 1
    // const updateResponse = await personsApi.updatePerson({
    //     id: 1,
    //     UpdatePersonRequest: {
    //         name: 'Ali Gajani'
    //     }
    // })
    
    // Get persons list instead of updating a specific person
    const response = await personsApi.getPersons()
    
    return NextResponse.json({ data: response });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
} 