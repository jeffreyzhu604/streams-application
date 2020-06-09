import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions';
import CommentForm from '../comments/CommentForm';

class CommentCreate extends Component {
    onSubmit = (formValues) => {
        this.props.createComment(this.props.currentStream.sid, formValues);
    }
    
    render() {
        return (
            <div>
                <CommentForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentStream: state.stream.currentStream[0]
    };
}
export default connect(mapStateToProps, {
    createComment
})(CommentCreate)