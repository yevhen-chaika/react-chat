import { combineReducers } from "redux";
import userData from "./userDataReducer";
import messagesData from "./messagesReducer";

const rootReducer = combineReducers({
    userData,
    messagesData
});

export default rootReducer;
