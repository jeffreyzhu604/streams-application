import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    fetchComments
} from '../../actions';

/*
    Class-based components since you want to fetch all
    the comments for a post
*/
class CommentList extends Component {
    fetchComments = (currentStream) => {
        this.props.fetchComments(currentStream).then(() => {
            this.renderComments();
        })
    }

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div>

                </div>
            );
        }
    }

    /* 
        TO DO: 
        - Create profile page for users, that way the comment displays the 
        image of the user
        - Annonymous comments
        - 
    */
    renderComments = () => {
        return this.props.comments.map((comment) => {
            console.log(comment)
            return (
                <div className="comment">
                    {/* empty avatar for now */}
                    <div className="content">
                        <a className="author">{comment.username}</a>
                        <div className="metadata">
                            <span className="date">{comment.date_created}</span>
                        </div>
                        <div className="text">{comment.comment}</div>
                        <div className="actions">
                            <Link to={'/streams/comments/new'} className="reply">Reply</Link>
                        </div>
                    </div>
                </div>
            );
        })
    }
    
    // renderAdmin???

    render() {
        return (
            <div className="ui threaded comments">
                <h3 className="ui dividing header">Comments</h3>
                {this.fetchComments(this.props.currentStream)}
                <Link to={'/streams/comments/new'} className="ui blue labeled submit icon button">
                    <i className="icon edit"></i>Comment
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.stream.currentStream)
    return {
        currentStream: state.stream.currentStream,
        comments: Object.values(state.comment.dbComments),
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {
    fetchComments
})(CommentList);