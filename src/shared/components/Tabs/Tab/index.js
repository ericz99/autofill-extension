import React from "react";

import { TabStyled, TabBody, TabHead } from "./Styles";

export default function Tab({ activeTab, label, onClick, ...props }) {
  const handleActiveTab = () => {
    // # set back activetab
    onClick(label);
  };

  return (
    <TabStyled
      className={activeTab === label ? "active" : ""}
      onClick={handleActiveTab}
      {...props}
    >
      <TabBody>
        <TabHead>{label}</TabHead>
      </TabBody>
    </TabStyled>
  );
}
