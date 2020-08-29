import React from "react";
import classes from "./Post.module.css";
import Avatar from "@material-ui/core/Avatar";

const Post = (props) => {
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
    </div>
  );
};

export default Post;
