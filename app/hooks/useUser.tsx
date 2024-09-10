import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useCallback, useEffect, useState } from 'react';

export interface User {
  userId: string;
  name: string;
  email: string;
  walletId?: string;
  coinsCollected?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie as string);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUser = useCallback((newUserData: User) => {
    setUser(newUserData);
    setCookie('user', JSON.stringify(newUserData), {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    deleteCookie('user');
    deleteCookie('token');
  }, []);

  return { user, loading, refetch, updateUser, logout };
}
