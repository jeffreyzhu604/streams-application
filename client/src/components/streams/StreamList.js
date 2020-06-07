import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.fetchStreams();
    }

    notEmpty = (object) => {
        let count = 0;
        if (object) {
            for (let key in object[0]) {
                if (object[0][key]) 
                    count = 1;
                if (count == 1)
                    return true;
            }            
        }
        return false;
    }

    renderAdmin = (stream) => {
        if (this.notEmpty(this.props.currentUserId) && this.props.isSignedIn) {
            if (stream.user_id == this.props.currentUserId[0].uid) {
                return (
                    <div className="right floated content">
                        <Link to={`/streams/edit/${stream.sid}`} className="ui button primary">Edit</Link>               
                        <Link to={`/streams/delete/${stream.sid}`} className="ui button negative">Delete</Link>               
                    </div>
                );
            }             
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
                <div className="ui item" key={stream.sid}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.sid}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.stream_description}</div>
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
        streams: Object.values(state.stream.dbStreams), // Takes the value from each key and forms an array
        currentUserId: state.auth.dbUserProfile,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {
    fetchStreams: fetchStreams
}) (StreamList);