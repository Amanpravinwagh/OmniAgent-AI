// src/components/GoogleLoginButton.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginButton({ onLoginSuccess, onLoginError }) {
  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: 'postmessage', // Updated to 'postmessage' for popup auth-code exchange
    onSuccess: async (codeResponse) => {
      try {
        // Post authorization code to your Express backend
        const res = await axios.post('http://localhost:5000/api/auth/google', {
          code: codeResponse.code,
        });

        console.log('Login successful:', res.data);

        // Store JWT token in local storage
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }

        if (onLoginSuccess) {
          onLoginSuccess(res.data);
        }
      } catch (err) {
        console.error('Backend OAuth Exchange Error:', err.response?.data || err.message);
        if (onLoginError) {
          onLoginError(err.response?.data?.message || 'Google authentication failed.');
        }
      }
    },
    onError: (errorResponse) => {
      console.error('Google OAuth Flow Error:', errorResponse);
      if (onLoginError) {
        onLoginError('Google login popup failed or was closed.');
      }
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="google-signin-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '10px 16px',
        borderRadius: '6px',
        border: '1px solid #334155',
        backgroundColor: '#1e293b',
        color: '#ffffff',
        cursor: 'pointer',
        width: '100%',
        fontWeight: '500',
      }}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
        style={{ width: '20px', height: '20px' }}
      />
      Continue with Google
    </button>
  );
}