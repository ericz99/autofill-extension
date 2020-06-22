import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveProfile } from "../../shared/actions/profileAction";
import { setConfig } from "../../shared/actions/settingAction";
import { saveSettings, setCurrentProfile } from "../../shared/utils/storage";
import Select from "../../shared/components/Select";

import Shopify from "./Shopify";
import Supreme from "./Supreme";
import Stripe from "./Stripe";

import { Wrapper, ActiveProfileSelector, Header } from "./Styles";

export default function Settings() {
  const { profiles, activeProfile } = useSelector((state) => state.profile);
  const settings = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  const updateSettings = (site, name) => {
    let newConfig = settings;
    // # UPDATE CONFIG
    newConfig[site][name] = !newConfig[site][name];
    // # UPDATE REDUX STATE
    dispatch(setConfig(newConfig));
    // # UPDATE CONFIG IN LOCALSTORAGE
    saveSettings(newConfig);
  };

  const handleActiveProfile = (e) => {
    const { value } = e.target;

    // # FETCH THE PROFILE
    profiles.forEach((profile) => {
      if (profile.profileName.trim() === value.trim()) {
        // # SELECT AS PROFILE
        dispatch(setActiveProfile(profile));
        // # STORE TO LOCALSTORAGE
        setCurrentProfile(profile);
      }
    });
  };

  return (
    <Wrapper>
      <ActiveProfileSelector>
        <Header>Active Profile</Header>
        <Select
          name="active-profile"
          options={profiles}
          defaultValue="Choose an active profile"
          value={activeProfile !== undefined ? activeProfile.profileName : ""}
          onChange={handleActiveProfile}
        />
      </ActiveProfileSelector>

      <Shopify
        handleChange={(name) => {
          updateSettings("shopify", name);
        }}
        settings={settings}
      />
      <Supreme
        handleChange={(name) => {
          updateSettings("supreme", name);
        }}
        settings={settings}
      />
      <Stripe
        handleChange={(name, value) => {
          updateSettings("stripe", name);
        }}
        settings={settings}
      />
    </Wrapper>
  );
}
