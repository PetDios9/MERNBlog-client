import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router'
import { Grid, Typography, Button, makeStyles, CircularProgress } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from "react-router"
import axios from 'axios'
import DeleteConfirmation from '../components/DeleteConfirmation'
import UserContext from '../util/UserContext'

const useStyles = makeStyles(theme => {
    return{
        bodyText: {
            //preserve line breaks in body text
            whiteSpace: 'pre-line',
        },
        loadingIndicator: {

        }
    }
})

export default function BlogDetails() {
    const classes = useStyles()

    const {id} = useParams()
    const {user} = useContext(UserContext)
    const [blog, setBlog] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const openDialog = () => setDialogOpen(true)
    const closeDialog = () => setDialogOpen(false)

    const getBlog = async () => {
        setLoading(true)
        await axios.get(`https://rocky-chamber-55659.herokuapp.com/blogs/${id}`)
            .then(response=> setBlog(response.data))
            .catch(err=> console.log(err))
        setLoading(false)
    }

    useEffect(() => {
        getBlog()
        return () => {
            setBlog({})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const history = useHistory()

    const handleDelete = async () => {
        setDeleteLoading(true)
        await axios.delete(`https://rocky-chamber-55659.herokuapp.com/blogs/${id}`) 
            .then(()=> {history.push('/')}) 
            .catch(err => (err))
        setDeleteLoading(false)
    }
    return (
        <div>
            {loading ? 
                <Grid 
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
                :
            
            <Grid container spacing={3} direction='row-reverse'>
                <Grid item xs={12}>
                    <Typography variant='h4'>
                        {blog.title}
                    </Typography> 
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {`Written on: ${blog.dateCreated}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {`Written by: ${blog.author}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1' className={classes.bodyText}>
                        {blog.body}
                    </Typography>
                </Grid>
                {user && user.username === blog.author ?
                <Grid item>
                    <Button 
                        startIcon={<DeleteIcon />} 
                        variant="contained" 
                        color='secondary' 
                        onClick={openDialog}
                    >
                            Delete Post
                    </Button>
                    <DeleteConfirmation deleteLoading={deleteLoading} open={dialogOpen} onClose={closeDialog} handleDelete={handleDelete}/>
                </Grid> : null}
            </Grid>}
        </div>
    )
}
