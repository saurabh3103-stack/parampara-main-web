import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define your shared states
  const [filtercategoryID, setFilterCategoryID] = useState("All"); // Default to "All"
  const [categoryData, setCategoryData] = useState([]);

  return (
    <AppContext.Provider
      value={{
        filtercategoryID,
        setFilterCategoryID,
        categoryData,
        setCategoryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};