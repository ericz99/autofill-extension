/* eslint-disable no-undef */
// # BACKGROUND.JS
console.log("background.js");

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

function startCheckout(url, profile, authenticityToken) {
  console.log("STARTING CHECKOUT!");

  const opts = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    },
    body: encodeFormData({
      _method: "patch",
      authenticity_token: authenticityToken,
      previous_step: "contact_information",
      step: "shipping_method",
      "checkout[email]": "asasdad10@yahoo.com",
      "checkout[buyer_accepts_marketing]": "0",
      "checkout[buyer_accepts_marketing]": "1",
      "checkout[shipping_address][first_name]": profile.firstName,
      "checkout[shipping_address][last_name]": profile.lastname,
      "checkout[shipping_address][company]": "",
      "checkout[shipping_address][address1]": profile.address,
      "checkout[shipping_address][address2]": profile.address2,
      "checkout[shipping_address][city]": profile.city,
      "checkout[shipping_address][country]": profile.country,
      "checkout[shipping_address][province]": profile.state,
      "checkout[shipping_address][zip]": profile.zipCode,
      "checkout[shipping_address][phone]": profile.phoneNumber,
      "checkout[shipping_address][first_name]": profile.firstName,
      "checkout[shipping_address][last_name]": profile.lastname,
      "checkout[shipping_address][company]": "",
      "checkout[shipping_address][address1]": profile.address,
      "checkout[shipping_address][address2]": profile.address2,
      "checkout[shipping_address][city]": profile.city,
      "checkout[shipping_address][country]": profile.country,
      "checkout[shipping_address][province]": profile.state,
      "checkout[shipping_address][zip]": profile.zipCode,
      "checkout[shipping_address][phone]": profile.phoneNumber,
      "checkout[client_details][browser_width]": "1903",
      "checkout[client_details][browser_height]": "969",
      "checkout[client_details][javascript_enabled]": "1",
      "checkout[client_details][color_depth]": "24",
      "checkout[client_details][java_enabled]": false,
      "checkout[client_details][browser_tz]": "240",
    }),
  };

  // # return back url
  return fetch(url, opts)
    .then((res) => {
      const currentUrl = res.url;
      const { hostname } = new URL(currentUrl);
      // # get shipping
      getShippingRate(hostname, profile).then((res) => {
        // # submit shipping
        submitShipping(currentUrl, res).then((res) => res);
      });
    })
    .catch((error) => console.log("Error:", error));
}

function getShippingRate(siteUrl, profile) {
  console.log("GRABBING SHIPPING RATE!");

  return fetch(
    `https://${siteUrl}/cart/shipping_rates.json?shipping_address[zip]=${
      profile.zipCode
    }&shipping_address[country]=${encodeURIComponent(
      profile.country.toLowerCase()
    )}&shipping_address[province]=${encodeURIComponent(
      profile.state.toLowerCase()
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const { source, code, price } = res["shipping_rates"][0];
      console.log(
        `SUCCESSFULLY GRABBED ${encodeURIComponent(
          `${source}-${code}-${price}`
        )} RATE!`
      );
      // # return back shipping rate
      return encodeURIComponent(`${source}-${code}-${price}`);
    })
    .catch((error) => console.log("Error:", error));
}

function submitShipping(url, rate) {
  console.log(`SUBMITTING SHIPPING RATE! - ${rate}`);

  const opts = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    },
    body: encodeFormData({
      _method: "patch",
      authenticity_token:
        "yOle1NS4ewdEigFN91arlLAnYCXXAq8McySJfcagO6R2uukUNnJbOSmYxfc12Alze3DbsZUaWhzz7c-aJE4a_w",
      previous_step: "shipping_method",
      step: "payment_method",
      "checkout[shipping_rate][id]": rate,
      "checkout[client_details][browser_width]": "2048",
      "checkout[client_details][browser_height]": "969",
      "checkout[client_details][javascript_enabled]": "1",
      "checkout[client_details][color_depth]": "24",
      "checkout[client_details][java_enabled]": false,
      "checkout[client_details][browser_tz]": "240",
    }),
  };

  return fetch(url, opts)
    .then((res) => {
      console.log("FORWARDING TO NEW CHECKOUT TAB!");
      const { hostname, pathname } = new URL(res.url);

      // # update tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        chrome.tabs.update(tab.id, {
          url: `https://${hostname}${pathname}?previous_step=shipping_method&step=payment_method`,
        });
      });
    })
    .catch((error) => console.log("Error:", error));
}

function skipToCheckoutFunc(request) {
  const { profile, authenticityToken, url } = request;
  // # start checkout
  startCheckout(url, profile, authenticityToken);
}

function processCheckoutFlow() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { cmd: "processCheckout" });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.cmd) {
    case "skipToCheckout":
      return skipToCheckoutFunc(request);
    case "processCheckout":
      return processCheckoutFlow();
    case "retryCheckout":
      return processCheckoutFlow();
    case "done":
      return;
    default:
      break;
  }
});

// #TODO: only retry to submit payment if user set retry. delay retry will be 500ms by default
