import React from 'react';
import firebase from 'firebase';
import {initFirebase, getPosts} from '../Utils/utilities';
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
            public: false,
        };

        this.onPost = this.onPost.bind(this);
        this.onChangePost = this.onChangePost.bind(this);
        this.onSetPrivacity = this.onSetPrivacity.bind(this);
        
    }

    componentDidMount(){
        const firebase_db = initFirebase(this.firebase, this.database);
        this.firebase = firebase_db.firebase;
        this.database = firebase_db.database;

        let postsPromise = getPosts(this.firebase, this.database, {argument: "public", cmp: "==", value: true});
        postsPromise.then(posts => {
            this.setState({postList:posts});
        }).catch(error => console.log(error));
    }

    onPost(){
        console.log("posteando...");
        let user = firebase.auth().currentUser;
        const today = Date.now();
        const post = {
            mail: user.email,
            date: today,
            message: this.state.postMessage,
            public: this.state.public,
            likes: 0
        }
        this.database.collection("posts").doc(today.toString()).set(post);
        
        if (post.public) {
            let newPostList = this.state.postList;
            newPostList.unshift(post);
            this.setState({ postList: newPostList });
        }
        this.setState({postMessage:""}); 
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
                <Navbar></Navbar>              
                <div>
                    <h1>Welcome to Home Page</h1>
                    <textarea rows="4" cols="50" onChange={this.onChangePost} value= {this.state.postMessage}/> <br></br>
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
                                likes ={post.likes}
                                isEditable = {false}
                                key={post.date}
                            />;
                        })}
                    </ul>
                    
                </div>
            </div>
        );
    }
} 
   
export default HomePage;
