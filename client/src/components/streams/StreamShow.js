import React, { Component } from 'react';
import flv from 'flv.js';
import { connect} from 'react-redux';
import { fetchStream } from '../../actions';
import CommentList from '../comments/CommentList';


class StreamShow extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8001/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();    
    }

    /*
        Problem: 
        - CommentList component relies on the data that is acquired when the 
        StreamShow component calls on the action creator fetchStream
        - fetchStream updates the Redux store with the current stream, however, this
        update is completed AFTER CommentList is created. This creates the problem I 
        have now, I have undefined values since the Redux store has not been updated
    */
    renderStream() {
        if (this.props.stream) {
            const { title, description } = this.props.stream
            return (
                <div>
                    <video ref={this.videoRef} style={{width: '100%'}} controls={true} />
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                    <CommentList />
                </div>
            );            
        }
        else
            return <div>Loading...</div>
    }

    render() {
        return (
            <div>
                {this.renderStream()}
            </div>
        );        
    }
}

const mapStateToProps = (state) => {
    console.log(state.stream.currentStream)
    return {
        stream: state.stream.currentStream
    }
}

export default connect(mapStateToProps, {
    fetchStream: fetchStream
})(StreamShow);