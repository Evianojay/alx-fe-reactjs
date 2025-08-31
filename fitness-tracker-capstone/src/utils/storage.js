// Utility functions for simulated localStorage (in-memory fallback)

export const getStoredData = (key, defaultValue = []) => {
  try {
    // use memoryStorage if available (fallback for environments without localStorage)
    const stored = window.memoryStorage?.[key];
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (err) {
    console.error("Error getting stored data:", err);
    return defaultValue;
  }
};

export const setStoredData = (key, data) => {
  try {
    if (!window.memoryStorage) window.memoryStorage = {};
    window.memoryStorage[key] = JSON.stringify(data);
  } catch (err) {
    console.error("Error setting stored data:", err);
  }
};
