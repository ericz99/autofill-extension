/* eslint-disable no-undef */
// # gets all profile stored in local storage
export const getProfiles = () => {
  return JSON.parse(localStorage.getItem("profiles"));
};

// # save profiles to local storage
export const saveProfiles = (profiles) => {
  localStorage.setItem("profiles", JSON.stringify(profiles));
};

// # get settings
export const getSettings = () => {
  return JSON.parse(localStorage.getItem("settings"));
};

// # save settings
export const saveSettings = (settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
  chrome.storage.local.set({ settings: settings });
};

// Sets the current profile to be used for autofilling to Chrome's local storage
export const setCurrentProfile = (profile) => {
  localStorage.setItem("activeProfile", JSON.stringify(profile));
  chrome.storage.local.set({ activeProfile: profile });
};

// # get current profile
export const getCurrentProfile = () => {
  return JSON.parse(localStorage.getItem("activeProfile"));
};
