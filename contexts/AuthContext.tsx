import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
