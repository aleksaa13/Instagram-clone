import React, { useEffect, useState } from "react";
import classes from "./Post.module.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

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

  useEffect(() => {
    let unsubscribee;
    if (props.postId) {
      unsubscribee = db
        .collection("posts")
        .doc(props.postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data().name);
          setLikes(data);
        });
    }
    return () => {
      unsubscribee();
    };
  }, [props.postId]);

  const addLike = (event) => {
    event.preventDefault();
    let allLikes = db.collection("posts").doc(props.postId).collection("likes");
    allLikes.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().name);
      setLikes(data);
    });
    if (likes.includes(props.user.displayName)) {
    } else {
      db.collection("posts")
        .doc(props.postId)
        .collection("likes")
        .add({ name: props.user.displayName });
    }
  };

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

      {props.user ? (
        <React.Fragment>
          <h4 className={classes.postText}>
            <strong>{props.username} </strong>
            {props.caption}
          </h4>
          <hr></hr>
          <div onClick={addLike} className={classes.likes}>
            <div className={classes.icon}>
              <FontAwesomeIcon
                icon={faHeart}
                style={
                  likes.includes(props.user.displayName)
                    ? { color: "red" }
                    : { color: "black" }
                }
              />
            </div>
            <p className={classes.likesNumber}>{likes.length}</p>
          </div>
          <hr></hr>
          {/*username + caption */}
          <div className={classes.postComments}>
            {comments.map((comment) => (
              <p>
                <strong>{comment.username} </strong>
                {comment.text}
              </p>
            ))}
          </div>
          <div className={classes.addComment}>
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
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Post;
