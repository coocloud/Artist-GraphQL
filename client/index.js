import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import ArtistList from './components/ArtistList';
import ArtistCreate from './components/ArtistCreate';
import ArtistDetail from './components/ArtistDetail';

const client = new ApolloClient({
    dataIdFromObject: o => o.id
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={ArtistList} />
                    <Route path="artists/new" component={ArtistCreate} />
                    <Route path="artists/:id" component={ArtistDetail} />
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
