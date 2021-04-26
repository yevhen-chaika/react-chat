export const ADD_TOAST = "ADD_TOAST";
export const SHIFT_TOASTS = "SHIFT_TOAST";

export function addToastToQueue(toast) {
    return {
        type: ADD_TOAST,
        toast
    }
}

export function shiftToastsQueue() {
    return {
        type: SHIFT_TOASTS
    }
}


