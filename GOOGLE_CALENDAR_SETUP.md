# Configuración de Google Calendar API

Esta configuración permite **consultar la disponibilidad** y **crear eventos automáticamente** en tu calendario de Google.

## Paso 1: Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Calendar API**:
   - Ve a **APIs & Services** > **Library**
   - Busca "Google Calendar API"
   - Haz clic en **Enable**

## Paso 2: Crear credenciales OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Si es la primera vez, configura la pantalla de consentimiento:
   - Tipo: **External**
   - Nombre de la app: "Servus Booking"
   - User support email: tu email
   - Developer contact: tu email
   - Agrega tu dominio en **Authorized domains**
   - Guarda y continúa
4. En **Scopes**, agrega:
   - `https://www.googleapis.com/auth/calendar.readonly` (lectura para consultar disponibilidad)
   - `https://www.googleapis.com/auth/calendar.events` (escritura para crear eventos)
5. En **Test users**, agrega tu email
6. Crea las credenciales:
   - Application type: **Web application**
   - Name: "Servus Calendar API"
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/callback` (desarrollo)
     - `https://tu-dominio.com/api/auth/callback` (producción)
7. Copia el **Client ID** y **Client Secret**

## Paso 3: Obtener Refresh Token

### Usando OAuth 2.0 Playground (Recomendado)

1. Ve a [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Haz clic en el ícono de configuración (⚙️) arriba a la derecha
3. Marca "Use your own OAuth credentials"
4. Ingresa tu **Client ID** y **Client Secret**
5. En la lista de APIs, busca y selecciona:
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
6. Haz clic en **Authorize APIs**
7. Inicia sesión con tu cuenta de Google
8. Acepta los permisos
9. Haz clic en **Exchange authorization code for tokens**
10. Copia el **Refresh token**

## Paso 4: Obtener Calendar ID

1. Abre [Google Calendar](https://calendar.google.com/)
2. Ve a **Settings** > **Settings for my calendars**
3. Selecciona tu calendario
4. En **Integrate calendar**, copia el **Calendar ID**
   - Generalmente es tu email o `primary` para el calendario principal

## Paso 5: Configurar variables de entorno

Crea o actualiza tu archivo `.env.local`:

```env
# Google Calendar API (lectura y escritura)
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui
GOOGLE_CALENDAR_ID=primary
```

**Para producción**, actualiza:
- `GOOGLE_REDIRECT_URI` con tu dominio real
- Agrega tu dominio en **Authorized redirect URIs** en Google Cloud Console

## Paso 6: Verificar la configuración

1. Reinicia tu servidor: `npm run dev`
2. Abre la aplicación y prueba seleccionar un horario
3. Deberías ver los horarios ocupados marcados como "Booked"
4. Al seleccionar un horario disponible, se abrirá Google Calendar con el evento prellenado

## Cómo funciona

- **Consulta de disponibilidad**: La API consulta tu calendario para ver qué horarios están ocupados
- **Creación de eventos**: Los eventos se crean automáticamente en tu calendario cuando el usuario selecciona un horario
- **Google Meet**: Se crea automáticamente un enlace de Google Meet para cada evento

## Notas importantes

- Necesitas permisos de **lectura** (`calendar.readonly`) y **escritura** (`calendar.events`) para consultar y crear eventos
- Los eventos se crean automáticamente en tu calendario cuando el usuario selecciona un horario
- Se crea automáticamente un enlace de Google Meet para cada evento
- El **Refresh Token** no expira (a menos que lo revoques)
- Asegúrate de mantener seguras tus credenciales (nunca las subas a Git)

## Solución de problemas

**Error: "invalid_grant"**
- El refresh token puede haber expirado o sido revocado
- Genera uno nuevo siguiendo el Paso 3

**Error: "insufficient permissions"**
- Verifica que los scopes sean `calendar.readonly` y `calendar.events`
- Asegúrate de haber aceptado los permisos en OAuth Playground

**Error: "Calendar not found"**
- Verifica que el `GOOGLE_CALENDAR_ID` sea correcto
- Usa `primary` para el calendario principal

