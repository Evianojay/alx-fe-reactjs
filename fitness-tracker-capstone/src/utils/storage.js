// src/utils/storage.js
// Robust storage helpers: prefer window.localStorage but fall back to in-memory object
// Provides getStoredData(key, defaultVal) and setStoredData(key, value)

const memoryStorage = {}; // in-memory fallback for environments without localStorage

export const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const getStoredData = (key, defaultValue = []) => {
  try {
    if (typeof window === "undefined") return defaultValue;
    if (window.localStorage) {
      const raw = window.localStorage.getItem(key);
      return raw ? safeParse(raw, defaultValue) : defaultValue;
    }
    // fallback to memory
    return memoryStorage[key] ? safeParse(memoryStorage[key], defaultValue) : defaultValue;
  } catch (err) {
    console.error("[storage] getStoredData error:", err);
    return defaultValue;
  }
};

export const setStoredData = (key, data) => {
  try {
    if (typeof window === "undefined") return;
    const str = JSON.stringify(data);
    if (window.localStorage) {
      window.localStorage.setItem(key, str);
    } else {
      memoryStorage[key] = str;
    }
  } catch (err) {
    console.error("[storage] setStoredData error:", err);
  }
};
