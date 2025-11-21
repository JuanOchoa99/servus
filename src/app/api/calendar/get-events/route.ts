import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Validar que las variables de entorno estén configuradas
const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error('Google Calendar API credentials are not configured. Please check your .env.local file.');
  }

  // Verificar que no sean placeholders
  if (refreshToken === 'tu_refresh_token' || refreshToken.includes('tu_')) {
    throw new Error('Please replace the placeholder refresh token with a valid one. See GOOGLE_CALENDAR_SETUP.md for instructions.');
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  
  return oauth2Client;
};

export async function POST(request: NextRequest) {
  try {
    // Validar configuración
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

    const { startDate, endDate } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      );
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Obtener eventos con su información completa (incluyendo status)
    const eventsResponse = await calendar.events.list({
      calendarId,
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
      orderBy: 'startTime',
      fields: 'items(id,start,end,status,summary)',
    });

    const events = eventsResponse.data.items || [];

    // Filtrar y formatear eventos
    const now = new Date();
    const formattedEvents = events
      .filter((event) => {
        // Solo incluir eventos con fecha de inicio
        if (!event.start?.dateTime && !event.start?.date) return false;
        
        const eventStart = event.start.dateTime 
          ? new Date(event.start.dateTime)
          : new Date(event.start.date!);
        
        const hoursUntilEvent = (eventStart.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        // Si el evento está cancelado y faltan menos de 2 horas, no incluirlo
        if (event.status === 'cancelled' && hoursUntilEvent < 2) {
          return false;
        }
        
        // Incluir todos los eventos (confirmados, tentativos, etc.) excepto cancelados con menos de 2 horas
        return true;
      })
      .map((event) => ({
        id: event.id,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        status: event.status || 'confirmed', // Por defecto confirmed si no tiene status
        summary: event.summary,
      }));

    return NextResponse.json({
      events: formattedEvents,
    });
  } catch (error: any) {
    console.error('Error getting events:', error);
    
    // Manejar errores específicos de OAuth
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
        error: 'Failed to get events', 
        message: error.message || 'Unknown error',
        hint: 'Check your Google Calendar API configuration and ensure your refresh token is valid.'
      },
      { status: 500 }
    );
  }
}

