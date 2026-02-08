// Google OAuth Service
class GoogleOAuthService {
  constructor() {
    this.clientId = null;
    this.isLoaded = false;
  }

  // Initialize Google OAuth
  initialize(clientId) {
    this.clientId = clientId;
    return new Promise((resolve, reject) => {
      if (window.google) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load Google OAuth script:', error);
        reject(new Error('Failed to load Google OAuth script'));
      };
      document.head.appendChild(script);
    });
  }

  // Sign in with Google
  async signIn() {
    if (!this.isLoaded || !this.clientId) {
      throw new Error('Google OAuth not initialized - please check your client ID');
    }

    return new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.initialize({
          client_id: this.clientId,
          callback: (response) => {
            if (response.credential) {
              resolve(response);
            } else {
              reject(new Error('No credential received from Google'));
            }
          },
          auto_select: false,
          cancel_on_tap_outside: false,
        });

        // Show the Google Sign-In popup
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If prompt is not displayed, show the button instead
            this.showSignInButton(resolve, reject);
          }
        });
      } catch (error) {
        console.error('Google OAuth initialization error:', error);
        reject(new Error('Failed to initialize Google OAuth'));
      }
    });
  }

  // Show Sign-In button as fallback
  showSignInButton(resolve, reject) {
    try {
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left'
        }
      );
      
      // Listen for button click
      const button = document.getElementById('google-signin-button');
      if (button) {
        button.addEventListener('click', () => {
          window.google.accounts.id.prompt();
        });
      }
    } catch (error) {
      reject(new Error('Failed to render Google Sign-In button'));
    }
  }

  // Decode JWT token
  decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT decode error:', error);
      throw new Error('Failed to decode Google token');
    }
  }

  // Check if Google OAuth is properly configured
  isConfigured() {
    return this.clientId && 
           this.clientId !== 'your-google-client-id' && 
           this.clientId !== '' &&
           this.clientId.length > 30; // Google Client IDs are reasonably long
  }

  // Create demo user for testing when Google OAuth fails
  createDemoUser() {
    return {
      credential: 'demo-jwt-' + Date.now(),
      demo: true,
      user: {
        sub: 'demo-user-' + Date.now(),
        email: 'demo.user@gmail.com',
        name: 'Demo User',
        picture: 'https://picsum.photos/seed/demo/100/100.jpg'
      }
    };
  }

  // Process Google credential and prepare data for backend
  processGoogleCredential(credential) {
    try {
      const decoded = this.decodeJWT(credential);
      return {
        google_id: decoded.sub,
        email: decoded.email,
        full_name: decoded.name,
        avatar_url: decoded.picture
      };
    } catch (error) {
      console.error('Error processing Google credential:', error);
      throw new Error('Failed to process Google credential');
    }
  }
}

export const googleOAuthService = new GoogleOAuthService();
