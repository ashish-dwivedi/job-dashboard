import gql from 'graphql-tag';

export const JOB_QUERY = gql`
  query jobs($id: String) {
    job(id: $id) {
      id
      title
      description
      date
      assignee {
        name
        email
        role
        avatar
      }
      status
      attachments {
        name
        downloadUrl
      }
    }
  }
`;
