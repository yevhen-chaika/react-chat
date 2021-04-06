import {SET_USER_DATA} from "../actions/userDataAction";

const initialState = {
    userData: {}
};

export default function userDataReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case SET_USER_DATA:
            return {...action.userData};
        default:
            return state;
    }
}

