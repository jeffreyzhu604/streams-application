import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import CommentCreate from './comments/CommentCreate';
import Header from './Header';
import history from '../History';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Auth0Authorization from '../util/Auth0Authorization';
import Auth0Callback from '../components/Auth0Callback';
import ProfileSetup from '../components/ProfileSetup';

class App extends Component {
    auth = new Auth0Authorization();

    handleAuthentication = (nextState, replace) => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            this.auth.handleAuthentication();
        }
    }

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/authcheck" render={(props) => {
                            return <ProfileSetup auth={this.auth} {...props} />
                        }} />
                        <Route path="/callback" render={(props) => {
                            this.handleAuthentication(props);
                            return <Auth0Callback {...props} />
                        }} />
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />
                        <Route path="/streams/comments/new" exact component={CommentCreate} />
                    </Switch>
                </Router>
            </div>
        );        
    }
    

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {
    signIn,
    signOut
})(App);