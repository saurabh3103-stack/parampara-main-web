// AppContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define your shared states
  const [filtercategoryID,setFilterCategoryID] = useState(null);
  
  return (
    <AppContext.Provider
      value={{
        filtercategoryID,setFilterCategoryID
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
