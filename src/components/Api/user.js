import { gql } from "@apollo/client";

// Query
export const USER_ME_QUERY = gql`
    query {
        me {
            username
        }
    }
`

export const USER_LIST_QUERY = gql`
    query {
        allUsers {
            username
            email
        }
    }
`

export const USER_PROFILE_LIST_QUERY = gql`
    query {
        allProfiles {
            user {
                username
                email
            }
            id
            image
        }
    }
`

// Mutation
export const USER_REGISTER_MUTATION = gql`
    mutation ($email: String!, $username: String!, $password1: String!, $password2: String!) {
        register (email: $email, username: $username, password1: $password1, password2: $password2) {
            success
            errors
        }
    }
`

export const USER_LOGIN_MUTATION = gql`
    mutation ($username: String!, $password: String!) {
        tokenAuth (username: $username, password: $password) {
            success
            errors
        }   
    }
`

export const USER_DELETE_JWT_TOKENS_MUTATION = gql`
    mutation {
        deleteTokenCookie {
            deleted
        }

        deleteRefreshTokenCookie {
            deleted
        }
    }
`

export const USER_DELETE_ACCESS_TOKEN_MUTATION = gql`
    mutation {
        deleteTokenCookie {
            deleted
        }
    }
`

export const USER_DELETE_REFRESH_TOKEN_MUTATION = gql`
    mutation {
        deleteRefreshTokenCookie {
            deleted
        }
    }
`

export const USER_VERIFY_TOKEN_MUTATION = gql`
    mutation ($token: String!) {
        verifyToken (token: $token) {
            success
            errors
            payload 
        }
    }
`

export const USER_REFRESH_TOKEN_MUTATION = gql`
    mutation ($refreshToken: String!) {
        refreshToken (refreshToken: $refreshToken) {
            token
            success
            errors
        }
    }
`

export const USER_PROFILE_INFO_MUTATION = gql`
    mutation ($user: String!) {
        getProfileInfo (user: $user) {
            profile {
                image
                totalFollowers
                followers {
                    username
                }
                user {
                    username
                    email
                }
            }
            message
        }
    }
`

export const USER_CHECK_PROFILE_MUTATION = gql`
    mutation ($user: String!) {
        checkUserProfile (user: $user) {
            profile {
                id
            }
        }
    }
`

export const USER_UPDATE_MUTATION = gql`
    mutation ($user: String!, $newUser: String!, $newEmail: String!, $image: String!){
        updateProfile (user: $user, newUser: $newUser, newEmail: $newEmail, image: $image) {
            message
        }
    }
`

export const USER_PROFILE_FOLLOW_MUTATION = gql`
    mutation ($follower: String!, $following: String!) {
        followProfile (follower: $follower, following: $following) {
            message
        }
    } 
`

export const USER_PROFILE_UNFOLLOW_MUTATION = gql`
    mutation ($follower: String!, $following: String!) {
        unfollowProfile (follower: $follower, following: $following) {
            message
        }
    }
`