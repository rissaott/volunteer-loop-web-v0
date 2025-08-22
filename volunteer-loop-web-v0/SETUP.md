# VolunteerLoop Setup Guide

## Google Auth Setup

To enable Google authentication in VolunteerLoop, you need to configure Supabase with Google OAuth.

### 1. Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Configuration

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Authentication** > **Providers**
4. Enable **Google** provider
5. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
   - Authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to **Credentials** > **Create Credentials** > **OAuth 2.0 Client IDs**
5. Set application type to **Web application**
6. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:5173/` (for development - redirects to home page)

### 4. Features

The app now includes:
- ✅ Google OAuth login button
- ✅ User authentication state management
- ✅ User profile display (avatar, name, email)
- ✅ Sign out functionality
- ✅ Loading states and error handling
- ✅ Automatic redirect to home page after login

### 5. Usage

Users can:
1. Click "Sign in with Google" button
2. Complete Google OAuth flow
3. Be automatically redirected back to the home page
4. See their profile information
5. Sign out when needed

The authentication state is managed globally and persists across page refreshes. After successful login, users are redirected to the home page (`/`) where they can see their authenticated state. 