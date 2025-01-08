import React, { useState, useEffect, useRef } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const MyComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const authenticationAbortController = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    authenticationAbortController.current = controller;

    const authenticateAsync = async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate to continue', cancelLabel: 'Cancel', useDevicePassword: true, fallbackToDevicePassword: true, signal: controller.signal });
        setAuthenticated(result.success);
      } catch (error) {
        if (error.message !== 'The operation was aborted.') {
          console.error('Authentication error:', error);
        }
      }
    };

    authenticateAsync();

    return () => {
      controller.abort();
      authenticationAbortController.current = null;
    };
  }, []);

  return (
    <div>
      {authenticated ? <p>Authenticated</p> : <p>Not authenticated</p>}
    </div>
  );
};

export default MyComponent;