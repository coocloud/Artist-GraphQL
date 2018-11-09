import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchArtist from "../queries/fetchArtist";
import InfoCreate from './InfoCreate';
import InfoList from './InfoList';

class ArtistDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { artist } = this.props.data;

        if (!artist) { return <div>Loading...</div>; }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{artist.title}</h3>
                <InfoList facts={artist.info} />
                <InfoCreate artistId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql(fetchArtist, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(ArtistDetail);
