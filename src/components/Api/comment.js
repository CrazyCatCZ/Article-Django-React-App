import { gql } from "@apollo/client";

// Query
export const COMMENT_LIST_QUERY = gql`
  query {
    allComments {
      id
      content
      posted
      user {
        username
      }
    }
  }
`;

// Mutation
export const COMMENT_POST_MUTATION = gql`
  mutation($id: ID!, $user: String!, $content: String!) {
    commentPost(id: $id, user: $user, content: $content) {
      message
    }
  }
`;

export const COMMENT_DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      message
    }
  }
`;
