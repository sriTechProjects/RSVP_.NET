import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Custom hook for easy usage
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage on first render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
