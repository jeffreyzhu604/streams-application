import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComment, editComment } from '../../actions';
import CommentForm from '../comments/CommentForm';
import _ from 'lodash'

class CommentEdit extends Component {
    componentDidMount() {
        this.props.fetchComment(this.props.comment.cid);
    }

    onSubmit = (formValues) => {
        this.props.editComment(this.props.comment.cid, formValues);
    }

    render() {
        return (
            <div>
                <CommentForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.comment, 'comment')} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comment: state.comment.currentComment[0]
    }
}

export default connect(mapStateToProps, {

})(CommentEdit);