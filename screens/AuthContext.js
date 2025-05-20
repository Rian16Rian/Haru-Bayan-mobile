import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // adjust path if needed

const AuthContext = createContext();

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current session once on load
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setUser(session?.user || null);
      }
    };

    fetchSession();

    // Listen to auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup on unmount
    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
