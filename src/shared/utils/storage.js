// # Gets the profiles stored in local storage
export const getProfiles = () => {
  return JSON.parse(localStorage.getItem("profiles"));
};

// # save profiles to local storage
export const saveProfiles = (profiles) => {
  localStorage.setItem("profiles", JSON.stringify(profiles));
};
