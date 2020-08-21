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

// chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(request);

//   switch (request.cmd) {
//     case "retryCheckout":
//       return processCheckout();
//     default:
//       break;
//   }
// });

// # process the checkout
const processCheckout = () => {
  chrome.runtime.sendMessage({ cmd: "processCheckout" });
};

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
  processCheckout();
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
