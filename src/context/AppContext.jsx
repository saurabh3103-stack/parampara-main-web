// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [filtercategoryID, setFilterCategoryID] = useState(null); // Changed to null for "All" categories
  const [categoryData, setCategoryData] = useState({
    status: 0,
    data: [],
    message: ""
  });

  return (
    <AppContext.Provider
      value={{
        filtercategoryID,
        setFilterCategoryID,
        categoryData,
        setCategoryData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};