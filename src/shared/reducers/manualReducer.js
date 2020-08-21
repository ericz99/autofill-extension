import {
  CREATED_NEW_SITE,
  UPDATED_NEW_SITE,
  SELECTED_SITE,
} from "../constants/types";

const initialState = {
  sites: [],
  selectedSite: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATED_NEW_SITE:
      return {
        ...state,
        sites: [...state.sites, action.payload],
      };
    case UPDATED_NEW_SITE:
      return {
        ...state,
        sites: action.payload,
      };
    case SELECTED_SITE:
      return {
        ...state,
        selectedSite: action.payload,
      };
    default:
      return state;
  }
}
