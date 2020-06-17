import React from 'react';
import { Link } from 'react-router-dom';


// Initially root nodes gets passed in
const TreeNode = (props) => {
    
    const { node, getChildNodes, level } = props;

    const renderComments = (level, node) => {
        let count = level;
        const helper = (node) => {
            if (count == 0) {
                console.log(count, 'returned', node)
                return node;
            } else {
                count = count - 1;
                console.log(count);
                return helper(
                    <div className="comment">
                        <div className="comments">
                            {node}
                        </div>
                    </div>
                );                  
            }
        }
        /*
            - if level=0, then <div className="comment">
            - if level=1, then <div className="comment"><div className="comments"..
                                                            <div className="comment"
        */
        return helper(node);
    }
 

    return (
        <React.Fragment key={node.cid}>
            {renderComments(level,
                <div className="comment">
                    <div className="content">
                        <a className="author">{node.username ? node.username : "annonymous"}</a>
                        <div className="metadata">
                            <span className="date">{node.date_created}</span>
                        </div>
                        <div className="text">{node.comment}</div>
                        <div className="actions">
                            <Link to={'/streams/comments/new'} className="reply">Reply</Link>
                        </div>
                    </div>     
                </div>            
            )}
            {getChildNodes(node).map(childNode => (<TreeNode
                                                    {...props}
                                                    node={childNode}
                                                    level={level+1}
                                                    />)) 
            }        
        </React.Fragment>
    );
}

TreeNode.defaultProps = {
    level: 0,
};

export default TreeNode;

