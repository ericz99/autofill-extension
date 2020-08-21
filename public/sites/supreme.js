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
  _init(currentConfig, activeProfile);
});

const _init = (config, profile) => {
  const fields = {
    "[name='order[billing_name]'": profile.cardName,
    "[name='order[email]']": profile.email,
    "[name='order[tel]']": profile.phoneNumber,
    "[name='order[billing_address]']": profile.address,
    "[name='order[billing_address_2]']": profile.address2,
    "[name='order[billing_zip]']": profile.zipCode,
    "[name='order[billing_city]']": profile.city,
    "[name='order[billing_country]']": getCountryCode(
      profile.country.toLowerCase()
    ),
    "#orcer": profile.cvv,
    "#rnsnckrn": profile.cardNumber,
  };

  for (const [field, value] of Object.entries(fields)) {
    fillByElement(field, value);
  }

  // # some field required instant fill
  fillInstant("order_billing_state", profile.state);
  fillInstant("credit_card_month", profile.expMonth);
  fillInstant("credit_card_year", profile.expYear);

  // # if check term is enabled
  if (config.supreme.checkTerms) {
    checkTerms();
  }

  // # if payment process is enabled
  if (config.supreme.processPayment) {
    processPayment();
  }
};

// # fill by onchange
function fillByElement(field, value) {
  const el = document.querySelector(field);

  if (el) {
    const event = new Event("change");
    el.focus();
    el.value = value;
    el.dispatchEvent(event);
    el.blur();
  }
}

// # click on terms
function checkTerms() {
  document.getElementsByClassName("icheckbox_minimal")[1].click();
  document.querySelector(".terms .icheckbox_minimal").classList.add("checked");
}

// # process payment
const processPayment = () => {
  if (
    document
      .querySelector(".terms .icheckbox_minimal")
      .classList.contains("checked")
  ) {
    document.querySelector(".button, .checkout").click();
  }
};

// # fill field instantly
function fillInstant(field, value) {
  document.getElementById(field).value = value;
}

function getCountryCode(country) {
  let countries = {
    "united kingdom": "GB",
    "northern ireland": "NB",
    "united states": "USA",
    canada: "CANADA",
    austria: "AT",
    belarus: "BY",
    belgium: "BE",
    bulgaria: "BG",
    croatia: "HR",
    "czech republic": "CZ",
    denmark: "DK",
    estonia: "EE",
    finland: "FI",
    france: "FR",
    germany: "DE",
    greece: "GR",
    hungary: "HU",
    iceland: "IS",
    ireland: "IE",
    italy: "IT",
    latvia: "LV",
    lithuania: "LT",
    luxembourg: "LU",
    monaco: "MC",
    netherlands: "NL",
    norway: "NO",
    poland: "PL",
    portugal: "PT",
    romania: "RO",
    russia: "RU",
    slovakia: "SK",
    slovenia: "SI",
    spain: "ES",
    sweden: "SE",
    switzerland: "CH",
    turkey: "TR",
  };

  return countries[country.toLowerCase()];
}
