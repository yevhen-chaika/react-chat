export const ADD_MESSAGE = "ADD_MESSAGE";

export function addNewMessage(messageData) {
    return {
        type: ADD_MESSAGE,
        messageData: {
            roomId: messageData.roomId,
            userName: messageData.userName,
            message: messageData.message
        }
    }
}
