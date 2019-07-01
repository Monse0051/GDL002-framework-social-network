import React from 'react';
import firebase from 'firebase';
import {initFirebase, getPosts} from '../Utils/utilities';



class Post extends React.Component{
    constructor(props){
        super(props);
        this.firebase = firebase;
        this.database = null;
        this.newMessage = "";
        this.state = {likeCounter:this.props.likes, 
                        isDisabled:true};
       
        this.onClickLike = this.onClickLike.bind(this);
        this.onDelete = this.onDelete.bind(this);  
        this.onEdit= this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);  
        this.onChangePost = this.onChangePost.bind(this);    
    }

    componentDidMount(){
        const firebase_db = initFirebase(this.firebase, this.database);
        this.firebase = firebase_db.firebase;
        this.database = firebase_db.database;

    }

    onDelete(){
        console.log("DEBUG_MSG: deleting...")
        alert("are you sure?");
        this.database.collection("posts").doc(this.props.date.toString()).delete();
        this.props.deleteFunc(this.props.date);
    }

    onClickLike(){
        console.log("posteando...");
       
        const post = {
            mail: this.props.mail,
            date: this.props.date,
            message: this.props.msg,
            public: this.props.public,
            likes: this.state.likeCounter + 1
        }
        
        
        this.database.collection("posts").doc(this.props.date.toString()).set(post)
            console.log('then')
            this.setState((state)=> {
                return {likeCounter: state.likeCounter+1};

            }); 
           
    }

    onEdit(){
        console.log("editando...")
       this.setState({isDisabled: false});
    }

    onSave (){
    
        const post = {
            mail: this.props.mail,
            date: this.props.date,
            message: this.newMessage,
            public: this.props.public,
            likes: this.state.likeCounter 
        }
        
        this.database.collection("posts").doc(this.props.date.toString()).set(post);
               
        this.setState({isDisabled: true});
    }

    onChangePost(event){
        this.newMessage= event.target.value;
    }

    render() {
        let date = new Date(this.props.date).toDateString();
        let deleteBtn;
        let editBtn;
        if (this.props.isEditable ) {
            deleteBtn = <button className = "button" onClick={this.onDelete}><ion-icon name="trash"></ion-icon></button>;
            
            if(this.state.isDisabled){
                editBtn = <button className = "button" onClick={this.onEdit}><ion-icon name="create"></ion-icon></button> 
            }
            else{
                editBtn = <button className = "button" onClick={this.onSave}><ion-icon name="save"></ion-icon></button>;
            }
        }
        

        return (
            <div>
                <p>{this.props.mail}</p>
                <p>{date}</p>
                <p><textarea rows="4" cols="50" onChange={this.onChangePost} defaultValue={this.props.msg} disabled={this.state.isDisabled}>
                    </textarea>
                </p>
                <p>{this.state.likeCounter}</p>
                <button className = "button" onClick={this.onClickLike}> <ion-icon name="heart"></ion-icon></button>
                {deleteBtn}
                {editBtn}
                <br/>
            </div>
        );
    }
}

export default Post;