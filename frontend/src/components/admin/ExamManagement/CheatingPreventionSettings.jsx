// src/components/CheatingPreventionSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheatingPreventionSettings = () => {
  const [settings, setSettings] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [timeLimit, setTimeLimit] = useState('');
  const [questionRandomization, setQuestionRandomization] = useState(false);
  const [orderRandomization, setOrderRandomization] = useState(false);

  useEffect(() => {
    axios.get('/exam.json')
      .then(response => {
        setSettings(response.data.cheatingPreventionSettings);
      })
      .catch(error => {
        console.error('Error fetching cheating prevention settings:', error);
      });
  }, []);

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
    setTimeLimit(setting.timeLimit);
    setQuestionRandomization(setting.questionRandomization);
    setOrderRandomization(setting.orderRandomization);
  };

  const handleSave = () => {
    axios.post('/api/updateCheatingPreventionSettings', {
      id: selectedSetting.id,
      timeLimit: timeLimit,
      questionRandomization: questionRandomization,
      orderRandomization: orderRandomization
    })
      .then(() => {
        // Update local state to reflect changes
        setSettings(settings.map(setting =>
          setting.id === selectedSetting.id
            ? { ...setting, timeLimit, questionRandomization, orderRandomization }
            : setting
        ));
        alert('Settings updated successfully!');
      })
      .catch(error => {
        console.error('Error updating settings:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cheating Prevention Settings</h1>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2">Exam Title</th>
              <th className="border-b px-4 py-2">Time Limit (minutes)</th>
              <th className="border-b px-4 py-2">Question Randomization</th>
              <th className="border-b px-4 py-2">Order Randomization</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map(setting => (
              <tr
                key={setting.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSettingClick(setting)}
              >
                <td className="border-b px-4 py-2">{setting.examTitle}</td>
                <td className="border-b px-4 py-2">{setting.timeLimit}</td>
                <td className="border-b px-4 py-2">{setting.questionRandomization ? 'Enabled' : 'Disabled'}</td>
                <td className="border-b px-4 py-2">{setting.orderRandomization ? 'Enabled' : 'Disabled'}</td>
                <td className="border-b px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedSetting && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Edit Settings for: {selectedSetting.examTitle}</h2>
          <div className="mb-4">
            <label htmlFor="timeLimit" className="block font-medium mb-1">Time Limit (minutes)</label>
            <input
              type="number"
              id="timeLimit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={questionRandomization}
                onChange={(e) => setQuestionRandomization(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">Enable Question Randomization</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={orderRandomization}
                onChange={(e) => setOrderRandomization(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">Enable Order Randomization</span>
            </label>
          </div>
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default CheatingPreventionSettings;
