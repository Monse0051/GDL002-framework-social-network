import React from 'react';
import firebase from 'firebase';
import * as CONFIG from '../Constants/config';
import Navbar from '../Components/Navbar';
import Post from './Post';

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.firebase = firebase;
        this.database = null;

        this.state = {
            postList: [],
            postMessage: "",
            public: false
        };

        this.onPost = this.onPost.bind(this);
        this.onChangePost = this.onChangePost.bind(this);
        this.onSetPrivacity = this.onSetPrivacity.bind(this);
    }

    componentDidMount(){
        // if firebase app not initialized, then initialize
        if (this.firebase.apps.length === 0) {
            this.firebase.initializeApp(CONFIG.firebaseConfig);
        }
        const app = this.firebase.app();
        this.database = app.firestore();

        let postRef = this.database.collection("posts");
        let postQueryRef = postRef.where("public", "==", true);
        postQueryRef.orderBy("date", "asc");

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

    onPost(){
        console.log("posteando...");
        const post = {
            mail: "test@gmail.com",
            date: Date.now(),
            message: this.state.postMessage,
            public: this.state.public
        }
        this.database.collection("posts").doc(Date.now().toString()).set(post);
        let newPostList = this.state.postList;
        newPostList.push(post);
        //TODO: erase post after press button post
        //FIXME: new post should be showed after press button post
    }

    onChangePost(event) {
        this.setState({ postMessage: event.target.value });
    }

    onSetPrivacity(event){
        console.log(event.target.value);
        this.setState({public: event.target.value === "Public"})
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar></Navbar>
                </div>
                <div>
                    <h1>Welcome to the Home Page</h1>
                    <textarea rows="4" cols="50" onChange={this.onChangePost}> </textarea><br></br>
                    <input type="radio" name="privacity" value="Public" 
                        onChange={this.onSetPrivacity}/>Public
                    <input type="radio" name="privacity" value="Friends"
                        onChange={this.onSetPrivacity}/>Friends
                    <button onClick={this.onPost}>Post</button>
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
   
export default HomePage;