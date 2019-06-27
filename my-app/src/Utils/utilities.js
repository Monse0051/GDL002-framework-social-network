import * as CONFIG from '../Constants/config';


export const initFirebase = (firebase, database) => {
    // if firebase app not initialized, then initialize
    if (firebase.apps.length === 0) {
        firebase.initializeApp(CONFIG.firebaseConfig);
    }
    const app = firebase.app();
    database = app.firestore();

    return {firebase, database};
};

export const getPosts = (firebase, database, filter) =>{

    let postRef = database.collection("posts");
    let postQueryRef = postRef.where(filter.argument, filter.cmp, filter.value);

    return postQueryRef.get().then(querySnapshoot => {
        let newPostList = [];
        querySnapshoot.forEach(doc => {
            // adding post to a list
            let post = doc.data();
            console.log("DEBUG_MSG: post: ", post);
            //let newPostList = this.state.postList;
            newPostList.unshift(post);
            //this.setState({ postList: newPostList });
        });
        return newPostList;
    });

};
