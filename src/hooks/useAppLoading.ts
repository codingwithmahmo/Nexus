import { useState, useCallback } from 'react';

export const useAppLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  return {
    isLoading,
    completeLoading,
    showLoading,
  };
};
