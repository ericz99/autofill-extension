import { UPDATE_CONFIG } from "../constants/types";

export const setConfig = (options) => {
  return {
    type: UPDATE_CONFIG,
    payload: options,
  };
};
