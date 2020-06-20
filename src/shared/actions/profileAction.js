import {
  CREATED_PROFILE,
  DELETED_PROFILE,
  UPDATED_PROFILE,
  SELECTED_PROFILE,
} from "../constants/types";

export const addProfile = (profileData) => (dispatch) => {
  dispatch({
    type: CREATED_PROFILE,
    payload: profileData,
  });
};

export const deleteProfile = (idx) => (dispatch) => {
  dispatch({
    type: DELETED_PROFILE,
    payload: idx,
  });
};

export const updateProfile = (profiles) => (dispatch) => {
  dispatch({
    type: UPDATED_PROFILE,
    payload: profiles,
  });
};

export const selectProfile = (profile) => (dispatch) => {
  dispatch({
    type: SELECTED_PROFILE,
    payload: profile,
  });
};
