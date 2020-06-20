import {
  CREATED_PROFILE,
  DELETED_PROFILE,
  UPDATED_PROFILE,
  SELECTED_PROFILE,
} from "../constants/types";

const initialState = {
  profiles: [],
  selectedProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATED_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };
    case DELETED_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter((_, idx) => idx !== action.payload),
      };
    case UPDATED_PROFILE:
      return {
        ...state,
        profiles: action.payload,
      };
    case SELECTED_PROFILE:
      return {
        ...state,
        selectedProfile: action.payload,
      };
    default:
      return state;
  }
}
