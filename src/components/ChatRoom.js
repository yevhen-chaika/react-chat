import React, {useCallback, useEffect, useState, useRef} from 'react';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';
import { useParams } from "react-router";
import { addNewMessage } from "../store/actions/messagesAction";
import Toast from "./Toast";

function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ("000" + first.toString(36)).slice(-3);
    second = ("000" + second.toString(36)).slice(-3);
    return first + second;
}

const wsAddress = "ws://localhost:3030";

const ChatRoom = (props) => {
    const { roomId } = useParams();
    const { classes } = props;
    const [ notifications, setNewNotification ] = useState({});
    const connection = useRef();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.userData.userName);
    const messages = useSelector(state =>  state.messagesData[roomId] ? state.messagesData[roomId] : []);

    useEffect(() => {
        connection.current = new WebSocket(wsAddress);
        connection.current.onopen = () => {
            console.log('connected');
            const connectionMessage = ' has joined the chat';
            sendMessageToWS(connectionMessage);
        };
        connection.current.onclose = () => {
            console.log('close');
        };
        connection.current.onmessage = onMessage;

        return () => {
            connection.current.close();
        }
    }, []);

    const onMessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch(addNewMessage(message));
        if (message.roomId !== roomId) {
            setNewNotification(message);
        }
};

    const sendMessageToWS = useCallback(
        messageString => {
            const messageData = { id: generateUEID(), userName: userName, roomId: roomId, message: messageString };
            dispatch(addNewMessage(messageData));
            connection.current.send(JSON.stringify(messageData));
        }, [ roomId, userName ]
    );

    return (
        <>
            <div className={ classes.chatContainer }>
                <div className={ classes.messagesContainer }>
                    {
                        messages.map((message, index) =>
                            <ChatMessage
                                message={ message.message }
                                name={ message.userName }
                                key={ index }
                            />
                        )
                    }
                </div>
                <ChatInput
                    onSubmitMessage={ sendMessageToWS }>
                </ChatInput>
            </div>
            <Toast notification={ notifications } />
        </>
    )
};


ChatRoom.propTypes  = {
    classes: PropTypes.object.isRequired
};

const styles = {
    chatContainer: {
        width: '500px',
        margin: '100px auto',
        border: '1px solid #3f51b5',
    },
    messagesContainer: {
        padding: '30px',
        height: '450px',
        overflow: 'auto'
    }
};

export default withStyles(styles)(ChatRoom);
