import React from "react";

import Radio from "../../../shared/components/Radio";

import { SiteHeader, SiteWrapper, SiteRadio } from "./Styles";

export default function Shopify({ handleChange, settings }) {
  const handleOptionUpdate = (name) => {
    handleChange(name);
  };

  return (
    <>
      <SiteWrapper>
        <SiteHeader>Shopify</SiteHeader>
        <SiteRadio>
          Navigate Steps
          <Radio
            onChange={() => handleOptionUpdate("navigateSteps")}
            name="navigateSteps"
            defaultCheck={settings["shopify"]["navigateSteps"]}
            type="checkbox"
          />
        </SiteRadio>
        <SiteRadio>
          Process Payment
          <Radio
            onChange={() => handleOptionUpdate("processPayment")}
            name="processPayment"
            defaultCheck={settings["shopify"]["processPayment"]}
            type="checkbox"
          />
        </SiteRadio>
        <SiteRadio>
          Skip Shipping
          <Radio
            onChange={() => handleOptionUpdate("skipShipping")}
            name="skipShipping"
            defaultCheck={settings["shopify"]["skipShipping"]}
            type="checkbox"
          />
        </SiteRadio>
        <SiteRadio>
          Skip To Checkout
          <Radio
            onChange={() => handleOptionUpdate("skipToCheckout")}
            name="skipToCheckout"
            defaultCheck={settings["shopify"]["skipToCheckout"]}
            type="checkbox"
          />
        </SiteRadio>
      </SiteWrapper>
    </>
  );
}
