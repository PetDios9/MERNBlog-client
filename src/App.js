import React, {useEffect, useState } from 'react'
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { grey, pink, } from '@material-ui/core/colors';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from './util/PrivateRoute'
import Header from './components/Header';
import BlogDetails from './Pages/BlogDetails';
import CreateBlog from './Pages/CreateBlog';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage';
import axios from 'axios';
import UserContext from './util/UserContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: grey[900]
    },
    secondary: {
      main: pink[900]
    }
  }
})

const useStyles = makeStyles(theme => {
  return{
    root: {
      padding: '2%'
    }
  }
})


function App() {
  const classes = useStyles()
  const [user,setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('https://rocky-chamber-55659.herokuapp.com/users/authenticateduser', {withCredentials: true})
      if (response.data.isAuthenticated === true) {
        setUser(response.data.user)
      } else {
        setUser(null)
      }
    }

    fetchUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{overflow: 'hidden'}}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}> 
      <Router>
        <div>
          <UserContext.Provider value={{user, setUser}}>
            <Header />
            <Switch>
              <Route path="/blogs/:id" component={BlogDetails} />
              <PrivateRoute path="/create" component={CreateBlog} />
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route component={NotFoundPage} />
            </Switch> 
            </UserContext.Provider>
        </div>
      </Router>
      </div>
    </ThemeProvider>
   </div> 
  );
}

export default App;
