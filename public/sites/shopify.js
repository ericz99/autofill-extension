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

  // # if user still in information tab
  if (currentStep() !== "payment_method") {
    _init(currentConfig);
  }
});

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.cmd) {
    case "processCheckout":
      return finalizeCheckoutProcess();
    case "retryCheckout":
      return processCheckout();
    default:
      break;
  }
});

// # init our functions
const _init = (config) => {
  let currentUrl = document.URL;
  const authToken = document.querySelector('input[name="authenticity_token"]')
    .value;

  // # if current tab url includes `?previous_step=contact_information&step=shipping_method`
  // # we need to navigate to the checkout information
  if (currentUrl.includes("/checkouts") && config.shopify.skipToCheckout) {
    // # automaically skip to checkout | ONLY WORKS IF NO CHECKPOINT
    skipToCheckout(activeProfile, currentUrl, authToken);
  } else if (
    currentUrl.includes("&step=shipping_method") &&
    config.shopify.navigateSteps
  ) {
    // # click next step
    navigateSteps();
  } else {
    // # we need to fill shipping information
    fillShippingInfo(activeProfile);
  }
};

// # FILLS SHIPPING INFO
const fillShippingInfo = (profile) => {
  // # fill in shipping info
  fillInfo("checkout_email", profile.email);
  fillInfo("checkout_shipping_address_first_name", profile.firstName);
  fillInfo("checkout_shipping_address_last_name", profile.lastName);
  fillInfo("checkout_shipping_address_address1", profile.address);
  fillInfo("checkout_shipping_address_address2", profile.address2);
  fillInfo("checkout_shipping_address_city", profile.city);
  fillInfo("checkout_shipping_address_country", profile.country);
  fillInfo("checkout_shipping_address_province", profile.state);
  fillInfo("checkout_shipping_address_zip", profile.zipCode);
  fillInfo("checkout_shipping_address_phone", profile.phoneNumber);

  // # click next step after filling shipping information
  if (currentConfig.navigateSteps) {
    navigateSteps();
  }
};

// # check for captcha
const checkForRecaptcha = () => {
  return document.querySelector(".g-recaptcha") ? true : false;
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
  // # only click if recaptcha don't exist
  if (!checkForRecaptcha()) {
    conButton.click();
  }
};

// # get current step
const currentStep = () => {
  let element = document.querySelector("[data-step]");
  return element.dataset.step;
};

// # SKIP TO CHECKOUT FUNCTION
const skipToCheckout = (profile, url, authenticityToken) => {
  // # send to background.js
  chrome.runtime.sendMessage({
    cmd: "skipToCheckout",
    profile,
    url,
    authenticityToken,
  });
};

// # ALLOW RETRY TODO: do this later
const allowRetry = () => {
  if (currentConfig.shopify.retryAllow) {
    chrome.runtime.sendMessage({ cmd: "retryCheckout" });
  } else {
    chrome.runtime.sendMessage({ cmd: "done" });
  }
};

// # finalize the checkout process
const finalizeCheckoutProcess = () => {
  console.log("attempt to checkout");

  let attemptedCheckout = setTimeout(() => {
    navigateSteps();
    clearTimeout(attemptedCheckout);
  }, 1000);
};
