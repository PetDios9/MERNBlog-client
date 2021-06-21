import React from 'react'
import {Button, CircularProgress, Dialog, DialogActions, DialogTitle, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => {
    return{
        loadingIndicator: {
            position: 'absolute',
        },
    }
})

export default function DeleteConfirmation (props) {
    const classes = useStyles()
    return(
        <Dialog
            open={props.open}
            onClose={props.onClose}
            >
            <DialogTitle id="delete-dialog-title">Are you sure you would like to delete this blog?</DialogTitle>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Cancel
                </Button>
                <Button onClick={props.handleDelete} disabled={props.deleteLoading} variant="contained" color="secondary">
                    Delete Post
                    {props.deleteLoading && <CircularProgress size={22} color="secondary" className={classes.loadingIndicator}/>}
                </Button>
            </DialogActions>
        </Dialog>
        )
}
