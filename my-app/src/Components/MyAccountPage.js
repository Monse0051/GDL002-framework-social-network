import React from 'react';
import firebase from 'firebase';
import Navbar from './Navbar';
import Post from './Post';
import {initFirebase, getPosts} from '../Utils/utilities';

class  MyAccountPage extends React.Component {

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

        const mail = this.firebase.auth().currentUser.email;

        //FIXME crahs when refresh 2 times

        let postsPromise = getPosts(this.firebase, 
            this.database, 
            {argument: "mail", cmp: "==", value: mail});

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
                    <h1>Welcome to your Account</h1>
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
                                isEditable = {true}
                            />;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
} 
   
export default MyAccountPage;