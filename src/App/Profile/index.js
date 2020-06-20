import React, { useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProfileForm from "./ProfileForm";
import ProfileSelector from "./ProfileSelector";

import { addProfile } from "../../shared/actions/profileAction";
import { testProfile } from "../../shared/constants/any";
import { saveProfiles } from "../../shared/utils/storage";

import { Wrapper } from "./Styles";

export default function Profile({ selectedProfile }) {
  const { profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // #TODO: when refresh, redux state get reset, thats why it modifiy our saveProfiles(profiles).

  useLayoutEffect(() => {
    if (typeof profiles === "object") {
      const testProfileExist = profiles
        .map((profile) => profile.profileName)
        .indexOf(testProfile.profileName);
      if (testProfileExist === -1) {
        // # ADD TEST PROFILE
        dispatch(addProfile({ ...testProfile }));
      }
    }
  }, []);

  useEffect(() => {
    // # SAVE PROFILES TO LOCALSTORAGE
    saveProfiles(profiles);
  }, [profiles]);

  return (
    <Wrapper>
      <ProfileSelector />
      <ProfileForm selectedProfile={selectedProfile} />
    </Wrapper>
  );
}
