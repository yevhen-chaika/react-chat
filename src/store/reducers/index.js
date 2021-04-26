import { combineReducers } from "redux";
import userData from "./userDataReducer";
import messagesData from "./messagesReducer";
import toastsQueue from "./toastsReducer";

const rootReducer = combineReducers({
    userData,
    messagesData,
    toastsQueue
});

export default rootReducer;
