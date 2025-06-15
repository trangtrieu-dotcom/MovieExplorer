const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWYzMGE3YjExMDFiM2IzNTIxYWZhMjQwMTAxNzRmMyIsIm5iZiI6MTc0OTczNDA4My45ODEsInN1YiI6IjY4NGFkMmMzZWJkNzI0NGU2ZTMwMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FIM64IJGN_PxPOFz-l9TNeRrHUj3dRiMDo15CMe_Kl4";
const BASE_URL = "https://api.themoviedb.org/3";
const REDIRECT_URL = "http://localhost:3000/login";

// Authentication service for TMDB GUIDE (Fetch Request + token guide)
export const authService = {
  // Create a request token
  createRequestToken: async () => {
    const response = await fetch(`${BASE_URL}/authentication/token/new`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    
    // checks if the request token is successful then it saves it to the localStorage same for all others (similar to this one)
    if (data.success) {
      localStorage.setItem('request_token', data.request_token);
      return data.request_token;
    } else {
      throw new Error('Failed to create request token');
    }
  },

  // Get the TMDB authentication URL (redirect method first one in the list of 3 in the guide)
  getAuthUrl: (requestToken) => {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(REDIRECT_URL)}`;
  },

  // Validate the token with a username/password (third one with login option in the guide)
  tokenValidation: async (username, password) => {
    const requestToken = localStorage.getItem('request_token');
    if (!requestToken) {
      throw new Error('There is no request token found. You will need to create a request token first.');
    }

    const response = await fetch(`${BASE_URL}/authentication/token/validate_with_login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      // This is requred for the login username and password when you try to login
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: requestToken
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('request_token', data.request_token);
      return data.request_token;
    } else {
      throw new Error('Your current credentials are incorrect. Please try again.');
    }
  },

  // Create a session with the validated request token
  createSession: async (requestToken = null) => {
    const token = requestToken || localStorage.getItem('request_token');
    if (!token) {
      throw new Error('There is no request token available. You will need to create a request token first.');
    }

    const response = await fetch(`${BASE_URL}/authentication/session/new`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify({
        request_token: token
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('session_id', data.session_id);
      localStorage.removeItem('request_token');
      return data.session_id;
    } else {
      throw new Error('You failed to create a session. Please try again.');
    }
  },

  // Login steps
  accountLogin: async (username, password) => {
    await authService.createRequestToken();
    await authService.tokenValidation(username, password);
    const sessionId = await authService.createSession();
    return sessionId;
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('session_id') !== null;
  },

  // Get the users current session ID
  getSessionId: () => {
    return localStorage.getItem('session_id');
  },

  // Logout the user
  logout: () => {
    localStorage.removeItem('session_id');
    localStorage.removeItem('request_token');
  },

  // Get the users account details
  getUserDetails: async () => {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('There are no sessions found. Please create a session first.');
    }

    const response = await fetch(`${BASE_URL}/account?session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    
    if (data.success === false) {
      throw new Error('There are no user details found.');
    }
    
    return data;
  }
}; 