import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    signIn,
    signOut,
    getProfile,
    removeProfile,
    setDbProfile,
    getDbProfile,
    removeDbProfile
} from '../actions';

class ProfileSetup extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated()) {
            this.props.signIn();
            this.props.getProfile(this.props.auth.userProfile);
            this.props.setDbProfile(this.props.auth.userProfile).then(
                () => {
                    this.props.getDbProfile(this.props.auth.userProfile);
                }
            );
        } else {
            this.props.signOut();
            this.props.removeProfile();
            this.props.removeDbProfile();
        }
    }
    
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userProfile: state.auth.userProfile,
        getDbProfile: state.auth.dbUserProfile
    }
}

export default connect(mapStateToProps,{
    signIn,
    signOut,
    getProfile,
    removeProfile,
    setDbProfile,
    getDbProfile,
    removeDbProfile
})(ProfileSetup);