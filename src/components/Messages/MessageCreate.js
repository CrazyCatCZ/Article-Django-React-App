import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import Cookies from 'js-cookie'

import { MESSAGE_CREATE_MUTATION } from '../Api/message'

const MessageCreate = () => {
    const user = Cookies.get('user')
    const { chatUser } = useParams()

    const [ messageInput, setMessageInput ] = useState('')
    const [ messageCreate ] = useMutation(MESSAGE_CREATE_MUTATION)


    const handleOnSubmit = (event) => {
        //if user click enter or click message button and enter something to textarea 
        if ((event.key === 'Enter' && messageInput !== '') || event.target.tagName === 'I') {
            messageCreate({ variables: { user: user, chatUser: chatUser, content: messageInput }})
            setMessageInput('')
            
            //reset site
            window.location.reload(false)
        }
    }

    return (
        <div className="message-create-container">
            <div className="message-create-form-container">
                <div className="form-group message-create-form-container">
                    <textarea
                        onChange={(event) => setMessageInput(event.target.value)}
                        onKeyPress={handleOnSubmit}
                        value={messageInput}
                        className="form-control form-control-lg text-area-container"
                        placeholder="Enter a message..." 
                    />
                </div>
            </div>
            <div onClick={handleOnSubmit} className="ml-3 message-button-container">
                <Icon name="send" size="big" />
            </div>

        </div>
    )
}

export default MessageCreate
