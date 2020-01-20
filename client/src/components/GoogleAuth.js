import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    // componentWillMount -> render -> componentDidMount
    componentDidMount() {
        // Loading client and auth2 libraries
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '50021499703-217b59f9hqogj9dv3ue1viij7t9d8tka.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        console.log(this.props);
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId()); // updates userId property of store's state
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton = () => {
        console.log(this.auth)
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Logout
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Login with Google
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
)(GoogleAuth);