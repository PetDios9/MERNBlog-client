import { Button, Grid, TextField, Typography, makeStyles } from '@material-ui/core'
import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router'

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

export default function RegisterPage(){
    const history = useHistory()
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    const classes = useStyles()

    const validate = values => {
        const errors = {}
        setUsernameError(false)
        setEmailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        if (!values.username) {
            errors.username= 'Required'
            setUsernameError(true)
        }
        if (!values.email) {
            errors.email = 'Required'
            setEmailError(true)
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Please Enter A Valid Email'
            setEmailError(true)
        }
        if (!values.password) {
            errors.password = 'Required'
            setPasswordError(true)
        } else if (values.password.length < 6) {
            errors.password = 'Please Enter A Password Longer Than 6 Characters'
            setPasswordError(true)
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Required"
            setConfirmPasswordError(true)
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match!'
            setConfirmPasswordError(true)
        }
        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit : async values => {
            const user = values
            const response = await axios.post('https://rocky-chamber-55659.herokuapp.com/users/register', user)
            if (response.data.error) {
                setErrorMessages(response.data.error)
            } else{
                history.push('/login')
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
                            Sign-up Here to Start Posting!
                        </Typography>
                    </Grid>

                    {errorMessages ? <Typography className={classes.errorText} variant="subtitle1">{errorMessages}</Typography> : null}

                    <Grid item xs={12}>
                        <TextField 
                            color="secondary" 
                            label="Username" 
                            id="username"
                            value={formik.values.username}
                            error={usernameError}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Typography className={classes.errorText} variant="subtitle2">{formik.errors.username}</Typography>
                    <Grid item xs={12}>
                        <TextField 
                            color="secondary" 
                            label="Email" 
                            id="email"
                            value={formik.values.email}
                            error={emailError}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Typography className={classes.errorText} variant="subtitle2">{formik.errors.email}</Typography>
                    <Grid item xs={12}>
                        <TextField 
                            color="secondary" 
                            label="Password" 
                            type="password"
                            id="password"
                            value={formik.values.password}
                            error={passwordError}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Typography className={classes.errorText} variant="subtitle2">{formik.errors.password}</Typography>
                    <Grid item xs={12}>
                        <TextField 
                            color="secondary" 
                            label="Confirm Password" 
                            type="password"
                            id="confirmPassword"
                            value={formik.values.confirmPassword}
                            error={confirmPasswordError}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Typography className={classes.errorText} variant="subtitle2">{formik.errors.confirmPassword}</Typography>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" type="submit">
                            Register!
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Already a user? Click here to login!
                        </Typography>
                    </Grid>
                    <Link to="/login" className={classes.link}>
                        <Button variant="contained" color="secondary" >
                            Login!
                        </Button>
                    </Link>
                </Grid>
            </form>
        </div>
    )
}