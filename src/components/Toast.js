import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { addToastToQueue } from "../store/actions/toastsActions";
import { shiftToastsQueue } from "../store/actions/toastsActions";

const Toast = props => {
    const { toast, classes } = props;
    const dispath = useDispatch();
    const toastList = useSelector(state => state.toastsQueue);

    useEffect(() => {
        if (toast.hasOwnProperty('message')) {
            dispath(addToastToQueue(toast));

            setTimeout(() => {
                dispath(shiftToastsQueue());
            }, 6000);
        }
    }, [ toast ]);

    return (
        <div className={ classes.toastContainer }>
            {
                toastList.map((toast, i ) =>
                    <div className={ classes.toastItem } key={ i }>
                        <span><strong>{ toast.userName }:</strong> { toast.message }</span>
                    </div>
                )
            }
        </div>
    )
};

Toast.propTypes = {
    toast: PropTypes.object.isRequired,
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
