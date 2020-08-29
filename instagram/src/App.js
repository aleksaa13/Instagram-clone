import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Post from "./Components/Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className={classes.App}>
      <div className={classes.app__header}>
        <img
          className={classes.app__headerImage}
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.post.username}
          imageUrl={post.post.imageUrl}
          caption={post.post.caption}
        />
      ))}
    </div>
  );
}

export default App;
