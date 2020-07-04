import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    fetchComments
} from '../../actions';
import CommentCreate from '../comments/CommentCreate';
import Tree from '../Tree';

/*
    Class-based components since you want to fetch all
    the comments for a post
*/
class CommentList extends Component {
    
    componentDidMount() {
        this.props.fetchComments(this.props.currentStream);
    }

    /* 
        TO DO: 
        - Create profile page for users, that way the comment displays the 
        image of the user
        - Displaying nested comments:
            - The nested comment is nested with a div with className="comments"
            - 
    */
    
    // renderAdmin???

    render() {
        return (
            <div className="ui threaded comments">
                <h3 className="ui dividing header">Comments</h3>
                <Tree />
                <CommentCreate />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.stream.currentStream)
    return {
        currentStream: state.stream.currentStream,
        comments: Object.values(state.comment.dbComments),
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps, {
    fetchComments
})(CommentList);