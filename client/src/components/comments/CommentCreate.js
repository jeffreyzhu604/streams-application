import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
import CommentForm from '../comments/CommentForm';

class CommentCreate extends Component {
    render() {
        return (
            <div>
                CommentCreate
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {

})(CommentCreate)