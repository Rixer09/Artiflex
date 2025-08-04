'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Role = 'customer' | 'creator' | null;

interface User {
    role: Role;
}

interface UserContextType {
  user: User;
  setUserRole: (role: Role) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ role: null });

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as Role;
    if (savedRole) {
      setUser({ role: savedRole });
    }
  }, []);

  const setUserRole = (role: Role) => {
    setUser({ role });
    if (role) {
        localStorage.setItem('userRole', role);
    } else {
        localStorage.removeItem('userRole');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
