import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        console.log(this.props);
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        if (stream.userId == this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>               
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negavtive">Delete</Link>               
                </div>
            );
        } 
    }

    renderCreate = () => {
        console.log(this.props)
        if (this.props.isSignedIn) {
            return (
                <div className="right floated" style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        return this.props.streams.map((stream) => {
            return (
                <div className="ui item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            ); 
        });  
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                    {this.renderCreate()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        streams: Object.values(state.stream), // Takes the value from each key and forms an array
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {
    fetchStreams: fetchStreams
}) (StreamList);