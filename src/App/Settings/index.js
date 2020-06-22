import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setConfig } from "../../shared/actions/settingAction";
import { saveSettings } from "../../shared/utils/storage";

import Shopify from "./Shopify";
import Supreme from "./Supreme";
import Stripe from "./Stripe";

import { Wrapper } from "./Styles";

export default function Settings() {
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

  return (
    <Wrapper>
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
