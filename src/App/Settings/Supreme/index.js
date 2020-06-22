import React from "react";

import Radio from "../../../shared/components/Radio";

import { SiteHeader, SiteWrapper, SiteRadio } from "./Styles";

export default function Supreme({ handleChange, settings }) {
  const handleOptionUpdate = (name) => {
    handleChange(name);
  };

  return (
    <>
      <SiteWrapper>
        <SiteHeader>Supreme</SiteHeader>
        <SiteRadio>
          Check Terms
          <Radio
            onChange={() => handleOptionUpdate("checkTerms")}
            name="checkTerms"
            defaultCheck={settings["supreme"]["checkTerms"]}
            type="checkbox"
          />
        </SiteRadio>
        <SiteRadio>
          Process Payment
          <Radio
            onChange={() => handleOptionUpdate("processPayment")}
            name="processPayment"
            defaultCheck={settings["supreme"]["processPayment"]}
            type="checkbox"
          />
        </SiteRadio>
      </SiteWrapper>
    </>
  );
}
