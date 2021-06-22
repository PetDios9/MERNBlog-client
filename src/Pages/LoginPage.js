import { Typography, Grid, TextField, Button, makeStyles } from '@material-ui/core'
import {React, useContext, useState,} from 'react'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router'
import UserContext from '../util/UserContext'

const useStyles = makeStyles(theme => {
    return {
        link: {
            textDecoration: 'none',
        },
        errorText: {
            color: 'red'
        }
    }
})

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()
    const {setUser} = useContext(UserContext)
    const classes= useStyles()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit : async values => {
            const loginInfo = values
            try {
                const response = await axios.post('https://rocky-chamber-55659.herokuapp.com/users/login', loginInfo, {withCredentials: true})
                if (response.data.user) {
                    const {user} = response.data
                    setUser(user)
                    history.push('/')
                }
            } catch (err) {
                console.log(err)
                setErrorMessage('Invalid Credentials')
            }
        }
    })

    return(
        <div>
            <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Grid 
                    container 
                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Login to Start Posting!
                        </Typography>
                    </Grid>
                    {errorMessage ? <Typography className={classes.errorText} variant="subtitle1">{errorMessage}</Typography>: null}
                    <Grid item xs={12}>
                        <TextField 
                            label="Username" 
                            color="secondary" 
                            id="username"
                            value={formik.values.username} 
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Password" 
                            color="secondary" 
                            type="password"
                            id="password"
                            value={formik.values.password} 
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" variant="contained" type="submit">
                            Sign On
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Not a user yet? Click here to register!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/register" className={classes.link}>
                            <Button color="secondary" variant="contained">
                                Register!
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}