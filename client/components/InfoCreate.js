import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class InfoCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                artistId: this.props.artistId
            }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a description</label>
                <input
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

const mutation = gql`
  mutation AddInfoToArtist($content: String, $artistId: ID) {
    addInfoToArtist(content: $content, artistId: $artistId) {
      id
      info {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(InfoCreate);
