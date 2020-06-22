import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectProfile } from "../../../shared/actions/profileAction";
import Select from "../../../shared/components/Select";

import { Row, FormControl } from "../Styles";

export default function ProfileSelector() {
  const { profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleProfileSelect = (e) => {
    const { value } = e.target;

    // # FETCH THE PROFILE
    profiles.forEach((profile) => {
      if (profile.profileName.trim() === value.trim()) {
        // # SELECT AS PROFILE
        dispatch(selectProfile(profile));
      }
    });
  };

  return (
    <>
      <Row>
        <FormControl>
          <Select
            name="profileSelected"
            bgColor="rgba(171,183,183,1)"
            options={profiles}
            onChange={handleProfileSelect}
            defaultValue="Choose an profile"
          />
        </FormControl>
      </Row>
    </>
  );
}
