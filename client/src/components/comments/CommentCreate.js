import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../../actions';
import CommentForm from '../comments/CommentForm';

class CommentCreate extends Component {
    // TO DO: preventDefault to prevent refresh
    onSubmit = (formValues) => {
        this.props.createComment(this.props.currentStream[0].sid, formValues).then(() => {
            console.log(this.props.currentStream);
            this.props.fetchComments(this.props.currentStream)
        })
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
        currentStream: state.stream.currentStream
    };
}
export default connect(mapStateToProps, {
    createComment,
    fetchComments
})(CommentCreate)