import { useEffect, useState } from "react";
import axios from "axios";
import { POST_ENDPOINT_DEPLOYMENT } from "./const";
import PostCard from "./PostCard";

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${POST_ENDPOINT_DEPLOYMENT}/posts`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <PostCard key={post.id} post={post} />
  ));
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}

export default PostList;
