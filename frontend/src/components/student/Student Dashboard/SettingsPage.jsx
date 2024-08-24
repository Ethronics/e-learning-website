import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.css";

const SettingsPage = () => {
  const [appearance, setAppearance] = useState({
    backgroundColor: "#ffffff",
    fontSize: "16px",
    theme: "light",
  });

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "appearance") {
      setAppearance({ ...appearance, [name]: value });
    } 
  };

  
  const handleSaveSettings = () => {
    // Save settings logic (e.g., save to localStorage or backend)
    console.log("Settings saved:", {
      appearance,
    });
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

          <label>Font Size</label>
          <input
            type="number"
            name="fontSize"
            min="10"
            max="24"
            value={parseInt(appearance.fontSize, 10)}
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
