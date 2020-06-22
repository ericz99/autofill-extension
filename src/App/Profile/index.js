import React from "react";
import { useSelector } from "react-redux";

import ProfileForm from "./ProfileForm";
import ProfileSelector from "./ProfileSelector";

import { Wrapper } from "./Styles";

export default function Profile() {
  const { selectedProfile } = useSelector((state) => state.profile);

  return (
    <Wrapper>
      <ProfileSelector />
      <ProfileForm selectedProfile={selectedProfile} />
    </Wrapper>
  );
}
