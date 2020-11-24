import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import './App.css'
import { USER_ME_QUERY } from './components/Api/user'

//Additional Components
//import Welcome from './components/Additional/Welcome/Welcome'
import Navbar from './components/Additional/Navbar/Navbar'
import Users from './components/Additional/Users/Users'
import Support from './components/Additional/Support/Support'
import SupportSuccess from './components/Additional/Support/SupportSuccess'

//Authentication
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'

//Posts
import Posts from './components/Posts/Posts/Posts'
import PostDetail from './components/Posts/PostDetail/PostDetail'
import PostCreate from './components/Posts/PostCreate/PostCreate'
import PostEdit from './components/Posts/PostEdit'

//Profiles
import Profile from './components/Profiles/Profile'

//Messages 
import MessagesContainer from './components/Messages/Messages/MessagesContainer'

function App () {
  //current logged in user
  const [ currentUser, setCurrentUser ] = useState(null)
  const { data: meQuery, loading, client } = useQuery(USER_ME_QUERY)


  useEffect(() => {
    if (meQuery && meQuery.me) {
      setCurrentUser(meQuery.me.username)
    }
  }, [meQuery]) 

  console.log(client)

  return (
    <div className="light-mode">
      <Navbar currentUser={currentUser} />
        <div>
          {currentUser !== null && loading == false ? (
            <>
              <Switch>
                <Route path="/posts" component={() => <Posts />} />
                <Route path="/users" component={() => <Users />} />
                <Route path="/support" component={() => <Support />} />
                <Route path="/support-success" component={() => <SupportSuccess />} />
                <Route path="/message/:chatUser" component={() => <MessagesContainer currentUser={currentUser} />} />
                <Route path="/profile/:user" component={() => <Profile currentUser={currentUser} />} />
                <Route path="/editPost/:id" component={() => <PostEdit currentUser={currentUser} />} />
                <Route path="/createPost" component={() => <PostCreate currentUser={currentUser} />} />
                <Route path="/:id" component={() => <PostDetail currentUser={currentUser} />} />
              </Switch>  
            </>
          ) : (
            <>
              {loading == false ? (
                <Switch>
                  <Route path="/register" component={() => <Register />} />
                  <Route path="/" component={() => <Login />} />
                </Switch>
              ) : null }
            </>
          )}
      </div>
    </div>
  );
}

export default App;
