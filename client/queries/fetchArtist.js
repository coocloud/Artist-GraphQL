import gql from 'graphql-tag';

export default gql`
  query ArtistQuery($id: ID!) {
    artist(id: $id) {
      id
      title
      info {
        id
        content
        likes
      }
    }
  }
`;
