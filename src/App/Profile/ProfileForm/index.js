import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  addProfile,
  updateProfile,
} from "../../../shared/actions/profileAction";

import {
  getProfiles,
  saveProfiles,
  getCurrentProfile,
  setCurrentProfile,
} from "../../../shared/utils/storage";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import { Form, FormControl, Row, SplitControl } from "../Styles";

export default function ProfileForm({ selectedProfile }) {
  const activeProfile = getCurrentProfile();
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const updateActiveProfile = (selectedProfile) => {
    if (selectedProfile.profileName === activeProfile.profileName) {
      // # update it
      setCurrentProfile(selectedProfile);
    }
  };

  const onSubmit = (data) => {
    // # PROFILE IS SELECTED AND SHOULD BE UPDATED
    if (Object.keys(selectedProfile).length > 0) {
      let profiles = getProfiles();
      const idx = profiles.findIndex(
        (p) => p.profileName === selectedProfile.profileName
      );
      if (idx > -1) {
        profiles[idx] = data;
        // # update active profile
        updateActiveProfile(profiles[idx]);
        // # UPDATE OUT LOCALSTORAGE
        saveProfiles(profiles);
        // # UPDATE OUR REDUX STATE
        dispatch(updateProfile(profiles));
      }

      return;
    }

    // # DISPATCH ACTION
    dispatch(addProfile(data));
    // # SAVE TO LOCALSTORAGE
    saveProfiles([...getProfiles(), data]);
  };

  useEffect(() => {
    let fields = [];
    if (Object.keys(selectedProfile).length > 0) {
      for (let [key, value] of Object.entries(selectedProfile)) {
        fields.push({ [key]: value });
      }

      // # SET VALUES
      setValue(fields);
    }
  }, [selectedProfile, setValue]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="profileName"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Profile Name"
                />
              }
              control={control}
              defaultValue=""
              name="profileName"
            />
          </FormControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="email"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="john@gmail.com"
                />
              }
              control={control}
              defaultValue=""
              name="email"
            />
          </FormControl>
        </Row>
        <Row>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="firstName"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="John"
                />
              }
              control={control}
              defaultValue=""
              name="firstName"
            />
          </SplitControl>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="lastName"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Doe"
                />
              }
              control={control}
              defaultValue=""
              name="lastName"
            />
          </SplitControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="address"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="85 Rockcrest Avenue"
                />
              }
              control={control}
              defaultValue=""
              name="address"
            />
          </FormControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="address2"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Address 2"
                />
              }
              control={control}
              defaultValue=""
              name="address2"
            />
          </FormControl>
        </Row>
        <Row>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="city"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="City"
                />
              }
              control={control}
              defaultValue=""
              name="city"
            />
          </SplitControl>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="state"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="State"
                />
              }
              control={control}
              defaultValue=""
              name="state"
            />
          </SplitControl>
        </Row>
        <Row>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="country"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Country"
                />
              }
              control={control}
              defaultValue=""
              name="country"
            />
          </SplitControl>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="zipCode"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Zip Code"
                />
              }
              control={control}
              defaultValue=""
              name="zipCode"
            />
          </SplitControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="phoneNumber"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Phone number"
                />
              }
              control={control}
              defaultValue=""
              name="phoneNumber"
            />
          </FormControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="cardName"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Card Name"
                />
              }
              control={control}
              defaultValue=""
              name="cardName"
            />
          </FormControl>
        </Row>
        <Row>
          <FormControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="cardNumber"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="Card Number"
                />
              }
              control={control}
              defaultValue=""
              name="cardNumber"
            />
          </FormControl>
        </Row>
        <Row>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="expMonth"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="12"
                />
              }
              control={control}
              defaultValue=""
              name="expMonth"
            />
          </SplitControl>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="expYear"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="2023"
                />
              }
              control={control}
              defaultValue=""
              name="expYear"
            />
          </SplitControl>
          <SplitControl>
            <Controller
              as={
                <Input
                  type="text"
                  name="cvv"
                  bgColor="rgba(171,183,183,1)"
                  placeholder="905"
                />
              }
              control={control}
              defaultValue=""
              name="cvv"
            />
          </SplitControl>
        </Row>
        <FormControl>
          <Button type="submit" color="#ffffff" bgColor="#2574a9">
            Save Profile
          </Button>
        </FormControl>
      </Form>
    </>
  );
}
