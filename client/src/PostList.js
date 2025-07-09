import { useEffect, useState } from "react";
import axios from "axios";
import { POST_ENDPOINT } from "./const";
import PostCard from "./PostCard";

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get(`${POST_ENDPOINT}/posts`);

    setPosts(response.data);
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
