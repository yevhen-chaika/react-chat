import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core';

const Toast = props => {
    const { newToast, classes } = props;
    const [ list, setList ] = useState([]);

    useEffect(() => {
        console.log(list);
        setTimeout(() => {
            deleteLastToast()
        }, 6000);
    }, [ list ]);

    useEffect(() => {
        if (newToast.hasOwnProperty('message')) {
            setList([newToast, ...list]);
        }
    }, [ newToast ]);

    const deleteLastToast = () => {
        list.splice(0, 1);
    };

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
    newToast: PropTypes.object.isRequired,
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
        ':not(:last-child)': {
            marginBottom: '20px'
        }
    }
};

export default withStyles(styles)(Toast);
