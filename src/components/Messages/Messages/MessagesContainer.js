import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

import { MESSAGE_LIST_MUTATION } from '../../Api/message'
import MessagesMap from './MessagesMap'
import MessageCreate from '../MessageCreate'

const MessagesContainer = () => {
    const user = Cookies.get('user')
    const { chatUser } = useParams()

    const [ queryUserMessages, { data: messagesData }] = useMutation(MESSAGE_LIST_MUTATION)

    //query all chat room messages
    useEffect(() => {
        queryUserMessages({ variables: {user: user, chatUser: chatUser} })
    }, [chatUser])

    
    return (
        <div className="chat-room-container">
            {/*If messagesData and user and chat_user messages*/}
            <div className="messages-and-create-form-container">
            {(messagesData && messagesData.queryUserMessages.message === 'Success') ? (
                <>
                    {messagesData && messagesData.queryUserMessages.messages.length !== 0 ? (
                        <MessagesMap messagesData={messagesData} />
                    ) : null }
                    <MessageCreate />
                </>
            ) : null}
            </div>
        </div>
    )
}

export default MessagesContainer
  