import {
  CREATED_NEW_SITE,
  UPDATED_NEW_SITE,
  SELECTED_SITE,
} from "../constants/types";

export const addNewSite = (site) => (dispatch) => {
  dispatch({
    type: CREATED_NEW_SITE,
    payload: site,
  });
};

export const updateSite = (sites) => (dispatch) => {
  dispatch({
    type: UPDATED_NEW_SITE,
    payload: sites,
  });
};

export const selectSite = (site) => (dispatch) => {
  dispatch({
    type: SELECTED_SITE,
    payload: site,
  });
};
