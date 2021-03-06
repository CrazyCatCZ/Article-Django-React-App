import { gql } from "@apollo/client";

// Query
export const COMMENT_LIST_QUERY = gql`
  query {
    allComments {
      user {
        username
      }
      id
      content
      posted
    }
  }
`;

// Mutation
export const COMMENT_POST_MUTATION = gql`
  mutation($id: ID!, $content: String!) {
    commentPost(id: $id, content: $content) {
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
