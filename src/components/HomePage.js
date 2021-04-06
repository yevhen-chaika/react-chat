import React, { useEffect, useState } from "react";
import {
    Button,
    Input,
    withStyles,
    Radio,
    FormControlLabel,
    RadioGroup
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from "../store/actions/userDataAction";

const chatRoomsData = ['room1', 'room2'];

const HomePage = (props) => {
    const [ userName, setUserName ] = useState('');
    const [ roomId, setRoomId ] = useState(null);
    const [ isFormValid, setFormIsValid ] = useState(false);
    const { classes } = props;
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    const moveToChatRoom = event => {
        event.preventDefault();
        dispatch(setUserData({userName, roomId}));
        props.history.push(`chat-room/${roomId}`);
    };

    useEffect( () => {
        (!!roomId && userName.length > 0) ? setFormIsValid(true) : setFormIsValid(false)
    }, [ roomId, userName ]);

    useEffect(() => {
        if (userData.userName) {
            setUserName(userData.userName);
            setRoomId(userData.roomId);
        }
    }, []);

    return (
        <div className={ classes.form }>
            <div className={ classes.marginBottom }>
                <Input
                    id={ 'name' }
                    placeholder={'Enter your name'}
                    value={ userName }
                    onChange={ e => setUserName(e.target.value)}
                />
            </div>
            <RadioGroup
                className={ classes.marginBottom }
                aria-label="gender"
                name="gender1"
                value={roomId}
                onChange={ e => setRoomId(e.target.value) }>
                {
                    chatRoomsData.map((roomId, index) =>
                        <div key={ index }>
                            <FormControlLabel
                                value={ roomId }
                                control={ <Radio /> }
                                label={ roomId }
                            />
                        </div>
                    )
                }
            </RadioGroup>
            <Button
                variant="contained"
                color="primary"
                disabled={ !isFormValid }
                onClick={ moveToChatRoom }
            >
                Join the chat
            </Button>
        </div>
    )
};

HomePage.propTypes  = {
    classes: PropTypes.object.isRequired
};

const styles = {
    form: {
        margin: '200px auto',
        padding: '30px',
        border: '1px solid',
        width: '300px'
    },
    marginBottom: {
        marginBottom: '40px'
    }
};

export default withStyles(styles)(HomePage);
