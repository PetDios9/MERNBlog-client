import {Link} from 'react-router-dom'
import {AppBar, makeStyles, Toolbar, Typography, Button} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { useContext} from 'react'
import UserContext from '../util/UserContext'
import axios from 'axios'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => {
    return {
        toolbar: theme.mixins.toolbar,
        welcome: {
            flexGrow: 5
        },
        links: {
            textDecoration: 'none',
            color: '#FFFFFF', 
            marginLeft: "2%"
        }
    }
})



export default function Header() {
    const classes = useStyles()
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)

    const logoutUser = async () => {
        try {
            await axios.get('https://rocky-chamber-55659.herokuapp.com/users/logout', {withCredentials: true})
        } catch(err) {
            console.log(err)
        }
        setUser(null)
        history.push('/')
        document.location.reload()
    }

    return (
        <div className={classes.toolbar}>
            <AppBar color="primary" position='fixed' elevation={0}>
                <Toolbar>
                    <Typography variant="h6" className={classes.welcome}>
                        {user !==null ? `${user.username}'s blog` : 'Welcome to MERN blog'}
                    </Typography>
                    <Link to="/" className={classes.links}>
                        <HomeIcon />
                    </Link> 
                    <Link to="/create" className={classes.links}>
                        <PostAddIcon />
                    </Link>
                    {user ? 
                    <Button onClick={() => logoutUser()} className={classes.links}>Logout</Button>
                    : 
                    <Link to='/login' className={classes.links}>
                        <Button>Login/Register</Button>
                    </Link>}
                </Toolbar>
            </AppBar>
        </div>
    )
}
