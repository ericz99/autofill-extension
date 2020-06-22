import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addProfile, setActiveProfile } from "../shared/actions/profileAction";
import { setConfig } from "../shared/actions/settingAction";

import {
  getProfiles,
  saveProfiles,
  getSettings,
  saveSettings,
  getCurrentProfile,
} from "../shared/utils/storage";
import { testProfile, defaultConfig } from "../shared/constants/any";
import Tabs from "../shared/components/Tabs";

import ProfileTab from "./Profile";
import SettingsTab from "./Settings";
import ACOTab from "./ACO";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import { Wrapper, Tab } from "./Styles";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let profiles = getProfiles();
    let settings = getSettings();

    if (profiles) {
      const activeProfile = getCurrentProfile();
      // # ADD ALL PROFILES
      profiles.forEach((profile) => dispatch(addProfile(profile)));
      // # ADD ACTIVE PROFILE TO REDUX
      dispatch(setActiveProfile(activeProfile));
    } else {
      profiles = [testProfile];
      settings = defaultConfig;
      // # ADD TEST PROFILE
      dispatch(addProfile({ ...testProfile }));
      // # ADD DEFAULT PROFILE
      dispatch(setActiveProfile(profiles[0]));
    }

    // # SAVE REDUX STATE CONFIG
    dispatch(setConfig(settings));
    // # SAVE PROFILES
    saveProfiles(profiles);
    // # SAVE CONFIG
    saveSettings(settings);
  }, []);

  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <Wrapper>
        <Tabs>
          <Tab label="Profile">
            <ProfileTab />
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
