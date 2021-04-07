import React, {useCallback, useEffect, useState} from 'react';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';
import { useParams } from "react-router";
import { addNewMessage } from "../store/actions/messagesAction";
import { useToast } from './Toast'

const ChatRoom = (props) => {
    const toast = useToast();
    const { roomId } = useParams();
    const { classes } = props;
    const ws = new WebSocket('ws://localhost:3030');
    const dispatch = useDispatch();
    const userName = useSelector(state => state.userData.userName);
    const messages = useSelector(state =>  state.messagesData[roomId] ? state.messagesData[roomId] : []);

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
            const connectionMessage = ' has joined the chat';
            sendMessageToWS(connectionMessage);
            dispatch(addNewMessage({ userName: userName, roomId: roomId, message: connectionMessage}));
        };
        ws.onclose = () => {
            console.log('disconnected');
        };

        return () => {
            ws.close();
        }
    }, []);

    useEffect(() => {
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(addNewMessage(message));
            if (message.roomId !== roomId) {
                console.log('added to toasts');
                showNewNotification(message);
            }
        };
    }, [ roomId ]);

    const showNewNotification = messageData => toast.add(messageData);

    const sendMessageToWS = useCallback(
        messageString => {
            const messageData = { userName: userName, roomId: roomId, message: messageString };
            ws.send(JSON.stringify(messageData));
        }, [ ws, roomId, userName ]
    );

    return (
        <>
            <div className={ classes.chatContainer } id="chatContainer">
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
                    onSubmitMessage={ sendMessageToWS }
                    ws={ws}>
                </ChatInput>
            </div>
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
