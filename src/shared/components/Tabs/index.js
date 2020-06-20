import React, { useState } from "react";

import Tab from "./Tab";

import { TabStyled, TabList, TabContent } from "./Styles";

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabStyled>
      <TabList>
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={handleSetActiveTab}
            />
          );
        })}
      </TabList>

      <TabContent>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </TabContent>
    </TabStyled>
  );
}
