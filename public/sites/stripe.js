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
  _init(currentConfig);
});

const _init = (config) => {
  // # only if autofill is enabled
  if (config.stripe.autofill) {
    startAutofill(activeProfile);
  }
};

var checkExist = setInterval(function () {
  if (document.getElementsByTagName("input").length) {
    console.log("Exists!");
    fillData(activeProfile);
    clearInterval(checkExist);
    return true;
  }
}, 100);

// # autofill method
const startAutofill = (profile) => {
  const mainFields = {
    "[autocomplete='name']": profile.cardName,
    "[autocomplete='email']": profile.email,
    "[autocomplete='tel']": profile.phoneNumber,
    "[autocomplete='cc-number']": profile.cardNumber,
    "[autocomplete='country']": profile.country,
    "[autocomplete='ccname']": profile.cardName,
    "[autocomplete='cc-csc']": profile.cvv,
    "[autocomplete='cc-exp']": `${profile.expMonth}/${profile.expYear.slice(
      2
    )}`,
    "[autocomplete='postal-code']": profile.zipCode,
    "[autocomplete='billing postal-code']": profile.zipCode,
    "[autocomplete='billing country']": profile.country,
  };

  for (const [key, value] of Object.entries(mainFields)) {
    // # fill in input fields
    fillByAttribute(key, value);
  }

  // # submit payment if active
  processPayment();
};

const processPayment = () => {
  if (currentConfig.stripe.processPayment) {
    let submitButton = document.querySelector('button[type="submit"]');
    submitButton.click();
  }
};

function fillData(profile) {
  const mainFields = {
    name: profile.cardName,
    email: profile.email,
    tel: profile.phoneNumber,
    "cc-number": profile.cardNumber,
    country: profile.country,
    ccname: profile.cardName,
    "cc-csc": profile.cvv,
    "cc-exp": `${profile.expMonth}/${profile.expYear.slice(2)}`,
    "postal-code": profile.zipCode,
    "billing postal-code": profile.zipCode,
  };

  // // # we must focus the div
  // const divs = document.getElementsByClassName("can-setfocus");
  // for (const div of divs) {
  //   const input = findInput(div.children);

  //   // if element exist
  //   if (input) {
  //     const attr = input.getAttribute("autocomplete");
  //     if (mainFields[attr]) {
  //       let event = document.createEvent("HTMLEvents");
  //       event.initEvent("change", true, false);
  //       // # first we focus the div, like focus()
  //       div.classList.add("Fieldset-child--focused");
  //       input.setAttribute("value", mainFields[attr]);
  //       input.value = mainFields[attr];
  //       input.dispatchEvent(event);
  //       // # remove class name, like blur()
  //       div.classList.remove("Fieldset-child--focused");
  //     }
  //   }
  // }

  console.log(document.getElementsByName("fieldset"));

  const inputs = document.getElementsByTagName("input");
  for (const input of inputs) {
    const attr = input.getAttribute("autocomplete");
    if (mainFields.hasOwnProperty(attr)) {
      const event = new Event("change");
      input.focus();
      input.setAttribute("value", mainFields[attr]);
      input.value = mainFields[attr];
      input.dispatchEvent(event);
      input.blur();
    }
  }
}

function findInput(collection) {
  for (const el of collection) {
    if (el.className === "Textbox-inputRow") {
      for (const inner of el.children) {
        if (inner.nodeName === "INPUT") {
          return inner;
        }
      }

      break;
    }

    break;
  }
}

// # fill in information for specific fields based on attribute
function fillByAttribute(field, value) {
  let element = document.querySelector(field);

  if (element) {
    const event = new Event("change", { bubbles: true });
    element.focus();
    element.value = value;
    element.dispatchEvent(event);
    element.blur();
  }
}
