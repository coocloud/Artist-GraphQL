import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchArtists';

class ArtistList extends Component {

    constructor (props) {
        super(props);
    }

    onArtistDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch());
    }

    renderArtists() {
        return this.props.data.artists.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/artists/${id}`}>
                        {title}
                    </Link>
                    <i
                        className="material-icons"
                        onClick={() => this.onArtistDelete(id)}
                    >
                        delete
                    </i>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <div>
                <h3>List of Artists</h3>
                <ul className="collection">
                    {this.renderArtists()}
                </ul>
                <Link
                    to="/artists/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
  mutation DeleteArtist($id: ID) {
    deleteArtist(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
    graphql(query)(ArtistList)
);
