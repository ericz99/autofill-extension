import React from "react";

import Radio from "../../../shared/components/Radio";

import { SiteHeader, SiteWrapper, SiteRadio } from "./Styles";

export default function Stripe({ handleChange, settings }) {
  const handleOptionUpdate = (name) => {
    handleChange(name);
  };

  return (
    <>
      <SiteWrapper>
        <SiteHeader>Stripe</SiteHeader>
        <SiteRadio>
          Autofill
          <Radio
            onChange={() => handleOptionUpdate("autofill")}
            name="autofill"
            defaultCheck={settings["stripe"]["autofill"]}
            type="checkbox"
          />
        </SiteRadio>
        <SiteRadio>
          Process Payment
          <Radio
            onChange={() => handleOptionUpdate("processPayment")}
            name="processPayment"
            defaultCheck={settings["stripe"]["processPayment"]}
            type="checkbox"
          />
        </SiteRadio>
      </SiteWrapper>
    </>
  );
}
