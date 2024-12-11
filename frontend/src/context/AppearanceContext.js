import React, { createContext, useState, useEffect } from "react";

export const AppearanceContext = createContext();

export const AppearanceProvider = ({ children }) => {
  const [appearance, setAppearance] = useState({
    backgroundColor: "#ffffff",
    fontSize: "16px",
    theme: "light",
  });

  useEffect(() => {
    const savedAppearance = JSON.parse(localStorage.getItem("appearance"));
    if (savedAppearance) {
      setAppearance(savedAppearance);
      applyStyles(savedAppearance);
    }
  }, []);

  const applyStyles = ({ backgroundColor, fontSize, theme }) => {
    // Set CSS custom properties for background color and font size
    document.documentElement.style.setProperty("--background-color", backgroundColor);
    document.documentElement.style.setProperty("--font-size", fontSize);
  
    // Apply theme class to the body
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  };

  const updateAppearance = (newAppearance) => {
    setAppearance(newAppearance);
    applyStyles(newAppearance);
    localStorage.setItem("appearance", JSON.stringify(newAppearance));
  };

  return (
    <AppearanceContext.Provider value={{ appearance, updateAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
};
