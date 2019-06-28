import React from 'react';
import firebase from 'firebase';
import {initFirebase, getPosts} from '../Utils/utilities';



class Post extends React.Component{
    constructor(props){
        super(props);
        this.firebase = firebase;
        this.database = null;
        this.state = {likeCounter:this.props.likes}; 
       

        this.onClickHandler= this.onClickHandler.bind(this);
        this.onDelete= this.onDelete.bind(this);    
            
    }

    componentDidMount(){
        const firebase_db = initFirebase(this.firebase, this.database);
        this.firebase = firebase_db.firebase;
        this.database = firebase_db.database;

    }

    onDelete(){
        console.log("DEBUG_MSG: deleting...")
        this.database.collection("posts").doc(this.props.date.toString()).delete()

        //  this.setState((state)=> {
        //     return {deletState: state.message }
      
        //  });
        this.props.deleteFunc(this.props.date);
    }

    onClickHandler(){
        console.log("posteando...");
       
        const post = {
            mail: this.props.mail,
            date: this.props.date,
            message: this.props.msg,
            public: this.props.public,
            likes: this.state.likeCounter + 1
        }
        
        
        this.database.collection("posts").doc(this.props.date.toString()).set(post)
     //   .then(()=>{
            console.log('then')
            this.setState((state)=> {
                return {likeCounter: state.likeCounter+1}
          
     //   });

        }) 
           
  
    }

    render() {
        let date = new Date(this.props.date).toDateString();

        let deleteBtn;

        if (this.props.isEditable) {
            deleteBtn = <button onClick={this.onDelete}>delete</button>;
        }

        return (
            <div>
                <p>{this.props.mail}</p>
                <p>{date}</p>
                <p>{this.props.msg}</p>
                <p>{this.state.likeCounter}</p>
                <button onClick={this.onClickHandler}> <ion-icon name="heart"></ion-icon></button>
                {deleteBtn}
                <br/>
            </div>
        );
    }
}

export default Post;