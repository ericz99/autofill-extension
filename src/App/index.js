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
  setCurrentProfile,
} from "../shared/utils/storage";
import { testProfile, defaultConfig } from "../shared/constants/any";
import Tabs from "../shared/components/Tabs";

import ProfileTab from "./Profile";
import SettingsTab from "./Settings";
import ManualTab from "./Manual";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import { Wrapper, Tab } from "./Styles";

// TODO: after editing the profile, active profile didnt update

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let profiles = getProfiles();
    let settings = getSettings();

    if (profiles) {
      const activeProfile = getCurrentProfile();

      if (activeProfile) {
        // # ADD ACTIVE PROFILE TO REDUX
        dispatch(setActiveProfile(activeProfile));
        // # SET ACTIVE PROFILE IT NOT ACTIVE
        setCurrentProfile(activeProfile);
      } else {
        // # ADD DEFAULT PROFILE
        dispatch(setActiveProfile(profiles[0]));
        // # SET ACTIVE PROFILE IT NOT ACTIVE
        setCurrentProfile(testProfile);
      }

      // # ADD ALL PROFILES
      profiles.forEach((profile) => dispatch(addProfile(profile)));
    } else {
      profiles = [testProfile];
      settings = defaultConfig;
      // # ADD TEST PROFILE
      dispatch(addProfile({ ...testProfile }));
      // # ADD DEFAULT PROFILE
      dispatch(setActiveProfile(profiles[0]));
      // # SET ACTIVE PROFILE IT NOT ACTIVE
      setCurrentProfile(testProfile);
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
          <Tab label="Manual">
            <ManualTab />
          </Tab>
        </Tabs>
      </Wrapper>
    </>
  );
}
