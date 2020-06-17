import React, { Component } from 'react';
import { connect } from 'react-redux';
import TreeNode from './TreeNode';

class Tree extends Component {
    getRootNodes = () => {
        return this.props.comments.filter(node => !node.cid_reference);
    }   

    getChildNodes = (node) => {
        let comments = this.props.comments;
        let children = comments.filter(comment => comment.cid_reference == node.cid);
        return children;
    }

    render() {
        let rootNodes = this.getRootNodes()
        return (
            
            <div>
                {console.log(rootNodes)}
                {
                    rootNodes.map(node => (
                        <TreeNode 
                            node={node}
                            getChildNodes={this.getChildNodes}
                        />
                     
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: Object.values(state.comment.dbComments)
    };
}

export default connect(mapStateToProps, null)(Tree);  