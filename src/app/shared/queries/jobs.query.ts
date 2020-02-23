import gql from 'graphql-tag';

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      description
      date
      status
      assignee {
        name
        email
        role
        avatar
      }
    }
  }
`;
