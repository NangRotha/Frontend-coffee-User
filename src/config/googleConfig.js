// Google OAuth Configuration Demo
// This file shows how to properly configure Google OAuth

// STEP 1: Get your Google OAuth Client ID
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Go to "APIs & Services" → "Credentials"
// 4. Click "Create Credentials" → "OAuth client ID"
// 5. Select "Web application"
// 6. Add authorized JavaScript origins:
//    - http://localhost:5173
//    - http://localhost:3000
//    - http://localhost:3001
// 7. Copy the Client ID

// STEP 2: Replace the placeholder below with your actual Client ID
export const GOOGLE_CONFIG = {
  // Replace this with your actual Google Client ID
  CLIENT_ID: 'your-google-client-id-here',
  
  // Your app's origins (for development)
  ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'http://localhost:3001'
  ]
};

// STEP 3: Update the googleOAuth.js service
// In src/services/googleOAuth.js, replace:
// const clientId = 'your-google-client-id';
// With:
// const clientId = GOOGLE_CONFIG.CLIENT_ID;

// STEP 4: Update backend .env file
// Add these lines to backend/.env:
// GOOGLE_CLIENT_ID=your-google-client-id-here
// GOOGLE_CLIENT_SECRET=your-google-client-secret-here

// STEP 5: Test the setup
// 1. Start both backend and frontend
// 2. Go to /login or /register
// 3. Click "Continue with Google"
// 4. Should work without errors!

// Common Issues and Solutions:
/*
1. "Something went wrong" error:
   - Check if Client ID is correct
   - Verify authorized origins in Google Console
   - Ensure you're using HTTPS in production

2. "Google OAuth not initialized":
   - Check if Google script is loading
   - Verify Client ID is set correctly
   - Check browser console for errors

3. "Invalid redirect URI":
   - Add your current URL to authorized origins
   - Check if you're using correct port

4. "No credential received":
   - Check Google OAuth configuration
   - Verify callback function is working
   - Check network requests in browser dev tools
*/

export default GOOGLE_CONFIG;
