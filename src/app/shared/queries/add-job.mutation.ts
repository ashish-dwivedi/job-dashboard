import gql from 'graphql-tag';

export const ADD_JOB_MUTATION = gql`
  mutation addJob($payload: AddJobPayloadType) {
    job(payload: $payload) {
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
    }
  }
`;
