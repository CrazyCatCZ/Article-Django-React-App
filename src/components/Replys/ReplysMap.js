import React from 'react'

import CustomReply from './CustomReply'

//map all replies
const ReplysMap = ({ replys }) => {
    return (
        <div>
            {(replys.map(({ id, content, posted, user: { username, profile: { image } } }) => {
                return (
                    <CustomReply 
                        key={id}
                        id={id}
                        content={content}
                        posted={posted}
                        username={username}
                        image={image}
                    />
                )
            }))}
        </div>
    )
}

export default ReplysMap
