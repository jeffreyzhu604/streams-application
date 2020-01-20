import React from 'react';
import Modal from '../Modal';
import history from '../../History';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAction = () => {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button 
                    className="ui button negative" 
                    onClick={() => this.props.deleteStream(id)} 
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
        return `Are you sure you want to delete the with title: ${this.props.currentStream.title}`;
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

const mapStateToProps = (state, ownProps) => {
    return {
        currentStream: state.stream[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps, {
        deleteStream: deleteStream,
        fetchStream: fetchStream
    }
)(StreamDelete);