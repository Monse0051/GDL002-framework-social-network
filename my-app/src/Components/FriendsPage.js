import React from 'react';
import firebase from 'firebase';
import Navbar from './Navbar';
import Post from './Post';
import * as CONFIG from '../Constants/config';

class FriendsPage extends React.Component {
    constructor(props){
        super(props);
        this.firebase = firebase;
        this.database = null;

        this.state = {postList:[]};
    }

    componentDidMount(){
        // if firebase app not initialized, then initialize
        if (this.firebase.apps.length === 0) {
            this.firebase.initializeApp(CONFIG.firebaseConfig);
        }
        const app = this.firebase.app();
        this.database = app.firestore();

        let postRef = this.database.collection("posts");
        let postQueryRef = postRef.where("public", "==", false);
        postQueryRef.orderBy("date", "desc");

        let newPostList = [];

        postQueryRef.get().then(querySnapshoot => {
            querySnapshoot.forEach(doc => {
                // adding post to a list
                let post = doc.data();
                console.log("DEBUG_MSG: post: ", post);
                //let newPostList = this.state.postList;
                newPostList.push(post);
                this.setState({postList: newPostList});
            });
        }).catch(error=>{
            console.error(error);
        });
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
                            />;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
} 
   
export default FriendsPage;