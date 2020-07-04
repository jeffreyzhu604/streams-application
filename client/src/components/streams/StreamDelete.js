import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../History';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStream, fetchStream, deleteComments } from '../../actions';

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAction = () => {
        const { id } = this.props.match.params;
        
        // TO DO: When deleting a stream, delete the comments as well
        return (
            <React.Fragment>
                <button 
                    className="ui button negative" 
                    onClick={() => this.props.deleteComments(this.props.currentStream[0].sid).then(() => this.props.deleteStream(id))} 
                >Delete</button>
                <Link 
                    className="ui button"
                    to="/"
                >Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent() {
        if (!this.props.currentStream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete the with title: ${this.props.currentStream[0].title}`;
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                action={this.renderAction()}
                onDismiss={() => history.push('/')}
            />
        );    
    }
}

const mapStateToProps = (state) => {
    return {
        currentStream: state.stream.currentStream
    }
}

export default connect(
    mapStateToProps, {
        deleteStream,
        fetchStream,
        deleteComments
    }
)(StreamDelete);