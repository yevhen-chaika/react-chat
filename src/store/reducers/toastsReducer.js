import { ADD_TOAST } from "../actions/toastsActions";
import { SHIFT_TOASTS } from "../actions/toastsActions";

export default function toastsQueueReducer(state, action) {
    if (typeof state === 'undefined') {
        return [];
    }

    switch (action.type) {
        case ADD_TOAST:
            return [...state, action.toast];
        case SHIFT_TOASTS:
            return state.slice(1);
        default:
            return state;
    }
}
