import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

    return (
        <AppContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </AppContext.Provider>
    );
};