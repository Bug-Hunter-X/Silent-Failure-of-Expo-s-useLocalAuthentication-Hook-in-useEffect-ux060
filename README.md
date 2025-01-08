# Silent Failure of Expo's useLocalAuthentication Hook in useEffect

This repository demonstrates a bug and its solution related to Expo's `useLocalAuthentication` hook.  The bug occurs when using this hook within a `useEffect` hook that attempts authentication on component mount. The authentication process may fail silently. The solution addresses this by properly handling asynchronous operations and ensuring cleanup is performed correctly.

## Bug Description
The `useLocalAuthentication` hook, when used within a `useEffect` that authenticates on mount, can fail silently. This is because the asynchronous authentication process might not complete before the component unmounts, potentially leaving the application in an unexpected state.

## Solution
The solution involves using an asynchronous function to handle the authentication process and properly cleaning up any active requests before the component unmounts.  A signal is also used to stop the operation.