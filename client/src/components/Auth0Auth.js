import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Auth0Authorization from '../util/Auth0Authorization';

class Auth0Auth extends Component {
    // componentWillMount -> render -> componentDidMount
    authorization = new Auth0Authorization();

    renderAuthButton = () => {
        console.log(this.auth)
        if (this.props.isSignedIn) {
            return (
                <button className="ui red button" onClick={() => {
                    this.props.signOut();
                }}>
                    Logout
                </button>
            );
        } else {
            return (
                <button className="ui blue button" onClick={() => {
                    this.authorization.login();
                    this.props.signIn();                    
                }}>
                    Login
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(
    mapStateToProps,
    //mapDispatchToProps
    {
        signIn: signIn,
        signOut: signOut
    }
)(Auth0Auth);