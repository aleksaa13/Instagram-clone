import React, { useState } from "react";
import classes from "./App.module.css";
import Post from "./Components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "aleksa_a13",
      imageUrl:
        "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      caption: "lepa slika",
    },
    {
      username: "mangula",
      imageUrl:
        "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      caption: "sfasfsafsafsafasfa",
    },
  ]);
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
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
