import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentCreate from '../components/comments/CommentCreate';
import { fetchComment } from '../actions';

/*
    Time Complexity for loading the components:
    - O(n^2) -> Need to make more efficient
*/
// Initially root nodes gets passed in
class TreeNode extends Component {
    renderComments = (level, node) => {
        let count = level;
        const helper = (node) => {
            if (count == 0) {
                return node;
            } else {
                count = count - 1;
                return helper(
                    <div className="comment">
                        <div className="comments">
                            {node}
                        </div>
                    </div>
                );                  
            }
        }
        return helper(node);
    }

    renderReply = () => {
        if (this.props.currentComment[0].cid == this.props.node.cid && this.props.isReply) 
            return <CommentCreate currentComment={this.props.currentComment} form={this.props.currentComment} />
        else 
            return <div></div>
    }

    getCurrentComment = () => {
        this.props.fetchComment(this.props.node.cid, this.props.currentStream[0].sid);
    }

    render() {
        return (
            <React.Fragment key={this.props.node.cid}>
                {this.renderComments(this.props.level,
                    <div className="comment">
                        <div className="content">
                            <a className="author">{this.props.node.username ? this.props.node.username : "annonymous"}</a>
                            <div className="metadata">
                                <span className="date">{this.props.node.date_created}</span>
                            </div>
                            <div className="text">{this.props.node.comment}</div>
                            <div className="actions">
                                <a onClick={this.getCurrentComment} className="reply">Reply</a>
                                {this.props.currentComment ? this.renderReply() : <div></div>}
                            </div>
                        </div>     
                    </div>            
                )}
                {this.props.getChildNodes(this.props.node).map(childNode => (<TreeNode
                                                        {...this.props}
                                                        node={childNode}
                                                        level={this.props.level+1}
                                                        />)) 
                }        
            </React.Fragment>
        );        
    }

}

const mapStateToProps = (state) => {
    return {
        currentComment: state.comment.currentComment,
        currentStream: state.stream.currentStream,
        isReply: state.comment.isReply
    };
}

TreeNode.defaultProps = {
    level: 0
};

export default connect(mapStateToProps, {
    fetchComment
})(TreeNode);

