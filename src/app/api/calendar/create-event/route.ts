import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error('Google Calendar API credentials are not configured. Please check your .env.local file.');
  }

  if (refreshToken === 'tu_refresh_token' || refreshToken.includes('tu_')) {
    throw new Error('Please replace the placeholder refresh token with a valid one. See GOOGLE_CALENDAR_SETUP.md for instructions.');
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  
  return oauth2Client;
};

export async function POST(request: NextRequest) {
  try {
    let oauth2Client;
    try {
      oauth2Client = getOAuthClient();
    } catch (configError: any) {
      return NextResponse.json(
        { 
          error: 'Configuration error', 
          message: configError.message,
          hint: 'Please configure Google Calendar API credentials in your .env.local file. See GOOGLE_CALENDAR_SETUP.md for instructions.'
        },
        { status: 500 }
      );
    }

    const { startDate, endDate, attendees } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      );
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Crear el evento
    const event = {
      summary: "Let's talk about your idea",
      description: "Meeting with Servus team to discuss your project idea and how we can help bring it to life.\n\nA Google Meet link will be added automatically when you save this event.",
      start: {
        dateTime: startDate,
        timeZone: process.env.TZ || 'America/Mexico_City', // Ajusta según tu zona horaria o usa variable de entorno TZ
      },
      end: {
        dateTime: endDate,
        timeZone: process.env.TZ || 'America/Mexico_City',
      },
      attendees: attendees || [
        { email: 'ochoaortizj@gmail.com' },
        { email: 'moosescn20@gmail.com' },
      ],
      conferenceData: {
        createRequest: {
          requestId: `servus-meeting-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 10 }, // 10 minutos antes
        ],
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1, // Necesario para crear Google Meet
    });

    return NextResponse.json({
      success: true,
      event: {
        id: createdEvent.data.id,
        htmlLink: createdEvent.data.htmlLink,
        hangoutLink: createdEvent.data.hangoutLink,
        start: createdEvent.data.start?.dateTime,
        end: createdEvent.data.end?.dateTime,
      },
    });
  } catch (error: any) {
    console.error('Error creating event:', error);
    
    if (error.message?.includes('invalid_grant') || error.code === 400) {
      return NextResponse.json(
        { 
          error: 'Invalid refresh token',
          message: 'The refresh token is invalid or has expired. Please generate a new one following the instructions in GOOGLE_CALENDAR_SETUP.md',
          details: 'This usually happens when the refresh token is a placeholder or has been revoked.'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create event', 
        message: error.message || 'Unknown error',
        hint: 'Check your Google Calendar API configuration and ensure your refresh token has the correct scopes (calendar and calendar.events).'
      },
      { status: 500 }
    );
  }
}

