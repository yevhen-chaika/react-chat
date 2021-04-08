export const ADD_MESSAGE = "ADD_MESSAGE";

export function addNewMessage(messageData) {
    return {
        type: ADD_MESSAGE,
        messageData: {
            id: messageData.id,
            roomId: messageData.roomId,
            userName: messageData.userName,
            message: messageData.message
        }
    }
}
