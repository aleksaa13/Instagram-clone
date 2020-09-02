import React, { useEffect, useState } from "react";
import classes from "./Post.module.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [props.postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className={classes.post}>
      <div className={classes.postHeader}>
        <Avatar
          className={classes.postAvatar}
          alt="username"
          src="static/images/avatar/1.jpg"
        />
        <h3>{props.username}</h3>
      </div>

      <img className={classes.postImage} alt="aleksa" src={props.imageUrl} />
      {/*image*/}

      <h4 className={classes.postText}>
        <strong>{props.username} </strong>
        {props.caption}
      </h4>
      {/*username + caption */}
      <div className={classes.postComments}>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>
            {comment.text}
          </p>
        ))}
      </div>

      {props.user ? (
        <React.Fragment>
          <form className={classes.commentForm}>
            <input
              className={classes.postInput}
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <button
            className={classes.postButton}
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Post;
