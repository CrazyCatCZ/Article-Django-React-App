import { gql } from "@apollo/client";

// Query
export const PROFILE_LIST_QUERY = gql`
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
`;

// Mutation
export const PROFILE_GET_INFO_MUTATION = gql`
  mutation($user: String!) {
    getProfileInfo(user: $user) {
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
`;

export const PROFILE_CHECK_USER_MUTATION = gql`
  mutation($user: String!) {
    checkUserProfile(user: $user) {
      profile {
        id
      }
    }
  }
`;

export const PROFILE_UPDATE_MUTATION = gql`
  mutation(
    $user: String!
    $newUser: String!
    $newEmail: String!
    $image: String!
  ) {
    updateProfile(
      user: $user
      newUser: $newUser
      newEmail: $newEmail
      image: $image
    ) {
      message
    }
  }
`;

export const PROFILE_FOLLOW_MUTATION = gql`
  mutation($follower: String!, $following: String!) {
    followProfile(follower: $follower, following: $following) {
      message
    }
  }
`;

export const PROFILE_UNFOLLOW_MUTATION = gql`
  mutation($follower: String!, $following: String!) {
    unfollowProfile(follower: $follower, following: $following) {
      message
    }
  }
`;
