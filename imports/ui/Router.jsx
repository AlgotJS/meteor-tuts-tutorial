import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import App from './App';
import PostCreate from './pages/Posts/PostCreate';
import PostEdit from './pages/Posts/PostEdit';
import PostView from './pages/Posts/PostView';
import PostList from './pages/Posts/PostList';

import Register from './pages/Users/Register';
import Login from './pages/Users/Login';

const Router = () =>
    <App>
        <Switch>
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/posts/create" component={PostCreate} />
            <Route exact path="/posts/edit/:_id" component={PostEdit} />
            <Route exact path="/posts/view/:_id" component={PostView} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Redirect from="*" to="/posts" />
        </Switch>
    </App>

export default Router;