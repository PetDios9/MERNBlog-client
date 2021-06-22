import { Button, CircularProgress, Grid, makeStyles, TextField, Typography, } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import date from 'date-and-time'
import { useHistory } from 'react-router'
import axios from 'axios'
import UserContext from '../util/UserContext'

const useStyles = makeStyles(theme => {
    return{
        loadingIndicator: {
            position: 'absolute',
        },
    }
})

export default function CreateBlog() {
    const classes = useStyles()

    const [title, setTitle] = useState('')
    const [snippet, setSnippet] = useState('')
    const [body, setBody] = useState('')
    const [titleErr, setTitleErr] = useState(false)
    const [snippetErr, setSnippetErr] = useState(false)
    const [bodyErr, setBodyErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {user} = useContext(UserContext)

    const validate = () => {
        setTitleErr(false)
        setSnippetErr(false)
        setBodyErr(false)

        if (title === '') {
            setTitleErr(true)
        }

        if (snippet === '') {
            setSnippetErr(true)
        }

        if (body === '') {
            setBodyErr(true)
        }
    }

    const clearFields = () => {
        setTitle('')
        setSnippet('')
        setBody('')
    }

    const postBlog = async () => {
        setLoading(true)
        const now = new Date()

        await axios.post('https://rocky-chamber-55659.herokuapp.com/blogs',{
            title,
            snippet,
            body,
            dateCreated: date.format(now, 'MMMM DD YYYY'),
            author: user.username
        }, {withCredentials: true})
            .then(() => { history.push('/')})   
            .catch(err=> console.log(err))

        setLoading(false)
    }

    const handleSubmit =  async (event) => {
        event.preventDefault()
        validate()

        if (title && snippet && body) {
            postBlog()
            clearFields()
        }
    }

    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Create a Blog!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            error={titleErr}
                            variant="outlined" 
                            label="Title" 
                            id="title-text" 
                            color="secondary" 
                            fullWidth={true} 
                            value={title}
                            onChange={event => setTitle(event.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            error={snippetErr}
                            variant="outlined" 
                            label="Snippet" 
                            id="snippet-text" 
                            color="secondary" 
                            fullWidth={true} 
                            value={snippet}
                            onChange={event => setSnippet(event.target.value)} 
                        />
                    </Grid>    
                    <Grid item xs={12}>
                        <TextField 
                            required
                            error={bodyErr}
                            variant="outlined" 
                            label="Body" 
                            id="body-text" 
                            color="secondary" 
                            multiline={true} 
                            rows={7} 
                            fullWidth={true} 
                            value={body}
                            onChange={event => setBody(event.target.value)}
                        />
                    </Grid>
                    <Grid item >
                        <Grid container direction="row-reverse">
                            <Grid item >
                                <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    Post
                                    {loading && <CircularProgress color="secondary" className={classes.loadingIndicator} size={20}/>}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
