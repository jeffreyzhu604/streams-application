import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.sid, formValues);
    }

    render() {
        if (!this.props.stream)
            return <div>Loading...</div>;

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'stream_description')} />
            </div>
        );        
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        stream: state.stream.currentStream[0]
    }
}

export default connect(mapStateToProps, {
    editStream: editStream,
    fetchStream: fetchStream
})(StreamEdit);