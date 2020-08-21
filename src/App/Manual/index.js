import React from "react";
import { useSelector } from "react-redux";

import SelectorForm from "./SelectorForm";
import SiteForm from "./SiteForm";

import { Wrapper } from "./Styles";

export default function Manual() {
  const { sites, selectedSite } = useSelector((state) => state.manual);

  return (
    <Wrapper>
      <SelectorForm sites={sites} />
      <SiteForm selectedSite={selectedSite} />
    </Wrapper>
  );
}
