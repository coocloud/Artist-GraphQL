import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class InfoList extends Component {
    constructor(props) {
        super(props)
    }

    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeInfo: {
                    id,
                    __typename: 'InfoType',
                    likes: likes + 1
                }
            }
        });
    }

    renderFacts() {
        return this.props.facts.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i
                            className="material-icons"
                            onClick={() => this.onLike(id, likes)}
                        >
                            thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <h5>Info List</h5>
                <ul className="collection">
                    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionEnter={true} transitionLeaveTimeout={500} transitionLeave={true}>
                        {this.renderFacts()}
                    </ReactCSSTransitionGroup>
                </ul>
            </div>
        )
    }
}

const mutation = gql`
  mutation LikeInfo($id: ID) {
    likeInfo(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(InfoList);