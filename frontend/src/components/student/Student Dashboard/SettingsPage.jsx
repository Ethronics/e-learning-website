import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.css";

const SettingsPage = () => {
  const [appearance, setAppearance] = useState({
    backgroundColor: "#ffffff",
    fontSize: "16px",
    theme: "light",
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedAppearance = JSON.parse(localStorage.getItem("appearance"));
    if (savedAppearance) {
      setAppearance(savedAppearance);
      applyStyles(savedAppearance);
    }
  }, []);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "appearance") {
      const updatedAppearance = { ...appearance, [name]: value };
      setAppearance(updatedAppearance);
      applyStyles(updatedAppearance);
    }
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("appearance", JSON.stringify(appearance));
    console.log("Settings saved:", appearance);
  };

  const applyStyles = ({ backgroundColor, fontSize, theme }) => {
    // Apply background color to the root element to ensure it cascades across the app
    document.documentElement.style.backgroundColor = backgroundColor;

    // Apply font size to the root element to ensure it cascades across the app
    document.documentElement.style.fontSize = `${fontSize}px`;

    // Apply theme class to the body
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  };

  return (
    <div className="p-6 settings-page">
      <div className="header">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        {/* Appearance Settings */}
        <div className="appearance-settings">
          <label>Background Color</label>
          <input
            type="color"
            name="backgroundColor"
            value={appearance.backgroundColor}
            onChange={(e) => handleInputChange(e, "appearance")}
            className="small-input"
          />

          <label>Font Size (px)</label>
          <input
            type="number"
            name="fontSize"
            min="16"
            max="24"
            value={parseInt(appearance.fontSize, 16)}
            onChange={(e) => handleInputChange(e, "appearance")}
            className="small-input"
          />

          <label>Theme</label>
          <select
            name="theme"
            value={appearance.theme}
            onChange={(e) => handleInputChange(e, "appearance")}
            className="small-input"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button onClick={handleSaveSettings} className="btn btn-primary">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
