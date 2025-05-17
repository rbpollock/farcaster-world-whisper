
import { useState, useEffect } from 'react';

interface WorldIDState {
  isVerified: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useWorldID = () => {
  const [state, setState] = useState<WorldIDState>({
    isVerified: false,
    isLoading: false,
    error: null
  });

  // Check for existing verification in localStorage on mount
  useEffect(() => {
    const storedVerification = localStorage.getItem('worldIdVerified');
    if (storedVerification === 'true') {
      setState(prev => ({ ...prev, isVerified: true }));
    }
  }, []);

  const setVerified = (isVerified: boolean) => {
    setState(prev => ({ ...prev, isVerified, error: null }));
    localStorage.setItem('worldIdVerified', isVerified.toString());
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: Error | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const logout = () => {
    localStorage.removeItem('worldIdVerified');
    setState({ isVerified: false, isLoading: false, error: null });
  };

  return {
    isVerified: state.isVerified,
    isLoading: state.isLoading,
    error: state.error,
    setVerified,
    setLoading,
    setError,
    logout
  };
};
