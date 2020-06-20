import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tabs from "../shared/components/Tabs";

import ProfileTab from "./Profile";
import SettingsTab from "./Settings";
import ACOTab from "./ACO";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import { Wrapper, Tab } from "./Styles";

export default function App() {
  const { selectedProfile } = useSelector((state) => state.profile);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // # SET SELECTED PROFILE
    setProfile(selectedProfile);
  }, []);

  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <Wrapper>
        <Tabs>
          <Tab label="Profile">
            <ProfileTab selectedProfile={profile} />
          </Tab>
          <Tab label="Settings">
            <SettingsTab />
          </Tab>
          <Tab label="ACO">
            <ACOTab />
          </Tab>
        </Tabs>
      </Wrapper>
    </>
  );
}
