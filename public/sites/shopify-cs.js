/* eslint-disable no-undef */
let activeProfile;
let currentConfig;

// # FETCH ACTIVE PROFILE
chrome.storage.local.get(["activeProfile"], (result) => {
  activeProfile = result.activeProfile;
});

// # FETCH USER SETTINGS FOR SHOPIFY ONLY
chrome.storage.local.get(["settings"], (result) => {
  currentConfig = result.settings;
  _init();
});

const _init = () => {
  // # fill in profile
  fillDataInfo(activeProfile);
};

// # FILLS SHIPPING INFO
const fillDataInfo = (profile) => {
  // # fill in card data
  fillInfo("number", profile.cardNumber);
  fillInfo("name", `${profile.cardName}`);
  fillInfo("expiry", `${profile.expMonth}/${profile.expYear.slice(2)}`);
  fillInfo("verification_value", profile.cvv);

  // # initalize checkout
  finalizeCheckoutProcess();
};

// # fill in information for specific fields
function fillInfo(id, value, byName = false) {
  let element = document[byName ? "getElementsByName" : "getElementById"](id);
  if (byName) element = element[0];

  if (element) {
    const event = new Event("change", { bubbles: true });
    element.focus();
    element.value = value;
    element.dispatchEvent(event);
    element.blur();
  }
}

// # NAVIGATE NEXT BUTTON
const navigateSteps = () => {
  let conButton = document.querySelector(".step__footer__continue-btn");
  if (!checkForRecaptcha()) {
    conButton.click();
  }
};

// # check for captcha
const checkForRecaptcha = () => {
  return document.querySelector(".g-recaptcha") ? true : false;
};

// # finalize the checkout process
const finalizeCheckoutProcess = () => {
  console.log("attempt to checkout");

  let attemptedCheckout = setTimeout(() => {
    navigateSteps();
    clearTimeout(attemptedCheckout);
  }, 1000);
};
