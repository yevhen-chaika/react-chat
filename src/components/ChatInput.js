import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, withStyles } from "@material-ui/core";


const ChatInput = (props) => {
    const [ message, setMessage ] = useState('');
    const classes = props.classes;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                props.onSubmitMessage(message);
                setMessage('');
            }}
                action="">
            <div className={ classes.textFields }>
                <Input
                    className={ classes.texInput }
                    placeholder={'Enter message'}
                    value={ message }
                    onChange={ e => setMessage(e.target.value) }
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Send
                </Button>
            </div>
        </form>
    )
};

ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const styles = {
    textFields: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px'
    },
    texInput: {
        flexGrow: '1',
        marginRight: '15px'
    }
};


export default withStyles(styles)(ChatInput);
