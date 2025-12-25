// src/ContextProvider.jsx
import React, { createContext, useState } from 'react';

// Create context
export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  // Your global state
  const [user, setUser] = useState(null);
  const host = "http://localhost:8000"; // Your backend URL
  
  return (
    <UserContext.Provider value={{ user, setUser, host }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;