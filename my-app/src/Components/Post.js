import React from 'react';
import firebase from 'firebase';
import * as CONFIG from '../Constants/config';

class Post extends React.Component{

    render() {
        let date = new Date(this.props.date).toDateString();
        return (
            <div>
                <p>{this.props.mail}</p>
                <p>{date}</p>
                <p>{this.props.msg}</p>
                <br/>
            </div>
        );
    }
}

export default Post;