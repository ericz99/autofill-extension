import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import settingReducer from "./settingReducer";

export default combineReducers({
  profile: profileReducer,
  setting: settingReducer,
});
