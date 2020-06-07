import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchStreamComments
} from '../../actions'

/*
    Class-based components since you want to fetch all
    the comments for a post
*/
class CommentList extends Component {
    componentDidMount() {
        this.props.fetchStreamComments(this.props.currentStream.sid);
    }

    renderComments = () => {

    }
    
    render() {
        return (
            <div>
                {this.renderComments()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentStream: state.stream.currentStream
    }
}

export default connect(mapStateToProps, {
    fetchStreamComments
})(CommentList);