import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { USER_LOGIN_MUTATION, USER_CHECK_PROFILE_MUTATION } from '../../Api/user'
import './Login.css'


const THIRTY_DAYS = 30

const Login = () => {
    const history = useHistory('')

    const [ failedToLogin, setFailedToLogin ] = useState('') 
    const [ allowButton, setAllowButton ] = useState(false)
    
    const [ loginUser, { data: loginData } ] = useMutation(USER_LOGIN_MUTATION)
    const [ checkUserProfile ] = useMutation(USER_CHECK_PROFILE_MUTATION)

    const [ usernameInput, setUsernameInput ] = useState('')
    const [ passwordInput, setPasswordInput ] = useState('')
    
    //if login wasn't successful
    useEffect(() => {
        if (loginData) {
            if (loginData.tokenAuth.success !== true) {
                setFailedToLogin(true)
            }
        }
    }, [loginData]) 
    
    //if login was successful
    useEffect(() => {
        if (loginData) {
            
            if (loginData.tokenAuth.success === true) {
                const token = loginData.tokenAuth.token

                Cookies.set('token', token, { expires: THIRTY_DAYS })

                //if user doesnt have profile -> create new one
                checkUserProfile({ variables: { user: usernameInput }})
                
                history.push('/posts')
                window.location.reload(false);
                history.push('/posts')
            }
        }
    }, [loginData])
   
    const handleOnSubmit = async (event) => {
        //if username and password are filled and user hit enter or create button
        if ((usernameInput !== '' && passwordInput !== '') && (event.key === 'Enter' || event.target.tagName === 'FORM')) {
            await loginUser({ variables: {
                username: usernameInput, password: passwordInput
            }})
        }
    }
    
    //Check if username and password was filled
    useEffect(() => {
        if (usernameInput !== '' && passwordInput !== '') {
            setAllowButton(true)
        }
    
        else {
            setAllowButton(false)
        }
    }, [usernameInput, passwordInput])


    return (
        <div className="login-container">
            {(failedToLogin !== false && failedToLogin !== '') ? (
                <Message
                    className="error-message-container"
                    error
                    header="Please, enter valid credentials"
                />
            ) : null }
            <Form onSubmit={handleOnSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        onChange={event => setUsernameInput(event.target.value)}
                        value={usernameInput}
                        autoComplete="one-time-code"
                        placeholder='Username'
                        maxLength="40"
                        autoFocus
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        onChange={event => setPasswordInput(event.target.value)}
                        value={passwordInput}
                        autoComplete="one-time-code"
                        type="password"
                        maxLength="30"
                        placeholder='Password' 
                    />
                </Form.Field>
                <Form.Field>
                    <p className="text-muted">Need an an account? <a href="/register" className="ml-2" >Sign up</a></p>
                </Form.Field>
                {/*If both fields were filled -> show undisabled button*/}
                {(allowButton) ? (
                    <Button className="submit-button" type='submit' primary>Login</Button>
                ) : (
                    <Button disabled className="submit-button" type='submit' primary>Login</Button>
                )}
            </Form>
        </div>
    )
}

export default Login
