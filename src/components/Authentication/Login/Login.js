import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { USER_LOGIN_MUTATION, USER_CHECK_PROFILE_MUTATION } from '../../Api/user'
import './Login.css'

const Login = () => {

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

                localStorage.setItem('user', usernameInput)
                localStorage.setItem('token', token)

                //if user doesnt have profile -> create new one
                checkUserProfile({ variables: { user: usernameInput }})
                
                window.location.reload(false);
            }
        }
    }, [loginData])
   
    const handleOnSubmit = () => {
        loginUser({ variables: {
            username: usernameInput, password: passwordInput
        }})
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
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={event => setUsernameInput(event.target.value)} value={usernameInput} placeholder='Username' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={event => setPasswordInput(event.target.value)} value={passwordInput} type="password" placeholder='Password' />
                </Form.Field>
                <Form.Field>
                    <p className="text-muted">Need an an account? <a href="/register" className="ml-2" >Sign up</a></p>
                </Form.Field>
                {/*If both fields were filled -> show undisabled button*/}
                {(allowButton) ? (
                    <Button onClick={handleOnSubmit} className="submit-button" type='button' primary>Login</Button>
                ) : (
                    <Button disabled onClick={handleOnSubmit} className="submit-button" type='button' primary>Login</Button>
                )}
            </Form>
        </div>
    )
}

export default Login
