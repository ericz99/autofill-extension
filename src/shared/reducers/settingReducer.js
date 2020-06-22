import { UPDATE_CONFIG } from "../constants/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONFIG:
      return action.payload;
    default:
      return state;
  }
}
