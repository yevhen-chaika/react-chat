import { ADD_MESSAGE } from "../actions/messagesAction";

export default function addMessageReducer(state, action) {
    if (typeof state === 'undefined') {
        return {};
    }

    switch (action.type) {
        case ADD_MESSAGE:
            if (state.hasOwnProperty(action.messageData.roomId)) {
                return {
                    ...state,
                    [action.messageData.roomId]: [ ...state[action.messageData.roomId], action.messageData ]
                }
            } else {
                return {
                    ...state,
                    [action.messageData.roomId]: [action.messageData]
                }
            }
        default:
            return state;
    }
}

