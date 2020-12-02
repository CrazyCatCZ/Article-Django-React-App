import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Message } from 'semantic-ui-react'
import { COMMENT_ADD_MUTATION } from '../Api/comment'

const CommentCreateForm = ({ id, currentUser }) => {
    const [ allowButton, setAllowButton ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    
    const [ commentInput, setCommentInput ] = useState('')
    const [ createComment, { data: commentData } ] = useMutation(COMMENT_ADD_MUTATION)

    const handleOnComment = async () => {
        await createComment({ variables: { id: id, user: currentUser, content: commentInput }})
    }
    
    useEffect(() => {
        if (commentData) {
            const { commentPost: { message } } = commentData
            
            if (message === 'Success') {
                setErrorMessage('')
                window.location.reload(false) // Reset site
            }

            else {
                setErrorMessage(true)
            }

        }
    }, [commentData])

    // If comment form was filled -> activate button
    useEffect(() => {
        const form_is_filled = commentInput !== ''
        
        if (form_is_filled) {
            setAllowButton(true)
        }
    
        else {
            setAllowButton(false)
        }
    }, [commentInput])


    return (
        <div className="comment-create-container">
            {errorMessage !== '' ? (
                <Message
                    className="error-message-container"
                    error
                    header={errorMessage}
                />
            ) : null }
            <Form reply>
                <textarea
                    onChange={event => setCommentInput(event.target.value)}
                    placeholder='Enter something...' 
                    maxLength="100"
                />
                <Button 
                    disabled={!allowButton} 
                    onClick={handleOnComment} 
                    className="comment-create-button" 
                    content='Comment' 
                    labelPosition='left'
                    icon='edit' 
                    primary 
                />
            </Form>
        </div>
    )
}

export default CommentCreateForm
