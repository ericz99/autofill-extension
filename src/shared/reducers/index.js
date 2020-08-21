import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import settingReducer from "./settingReducer";
import manualReducer from "./manualReducer";

export default combineReducers({
  profile: profileReducer,
  setting: settingReducer,
  manual: manualReducer,
});
