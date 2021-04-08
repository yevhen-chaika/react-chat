import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';

const Toast = props => {
    const { notification, classes } = props;
    const [ list, setList ] = useState([]);

    useEffect(() => {
        if (notification.hasOwnProperty('message')) {
            setList((prevState) => {
                return [...prevState, notification]
            });

            setTimeout(() => {
                setList((prevState) => prevState.filter((t) => t.id !== notification.id))
            }, 6000);
        }
    }, [ notification ]);

    return (
        <div className={ classes.toastContainer }>
            {
                list.map((toast, i ) =>
                    <div className={ classes.toastItem } key={ i }>
                        <span><strong>{ toast.userName }:</strong> { toast.message }</span>
                    </div>
                )
            }
        </div>
    )
};

Toast.propTypes = {
    notification: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const styles = {
    toastContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '30px',
        top: '30px'
    },
    toastItem: {
        width: '150px',
        padding: '15px',
        border: '1px solid #000',
        marginBottom: '20px'
    }
};

export default withStyles(styles)(Toast);
