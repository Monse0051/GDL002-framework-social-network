import React from 'react';
import firebase from 'firebase';
import Navbar from './Navbar';
import Post from './Post';
import {initFirebase, getPosts} from '../Utils/utilities';

class FriendsPage extends React.Component {
    constructor(props){
        super(props);
        this.firebase = firebase;
        this.database = null;

        this.state = {postList:[]};
    }

    componentDidMount(){
        
        const firebase_db = initFirebase(this.firebase, this.database);
        this.firebase = firebase_db.firebase;
        this.database = firebase_db.database;

        console.log(this.firebase.auth().currentUser);

        let postsPromise = getPosts(this.firebase, this.database, {argument: "public", cmp: "==", value: false});
        postsPromise.then(posts => {
            this.setState({postList:posts});
        }).catch(error => console.log(error));

    }


    render() {
        return (
            <div>
                <div>
                    <Navbar></Navbar>
                </div>
                <div>
                    <h1>Welcome to the FriendsPage</h1>
                </div>
                <div className="post-section">
                    <ul>
                        {this.state.postList.map(post => {
                            return <Post
                                mail={post.mail}
                                date={post.date}
                                msg={post.message}
                                public={post.public}
                                likes ={post.likes}
                                key = {post.date}
                            />;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
} 
   
export default FriendsPage;