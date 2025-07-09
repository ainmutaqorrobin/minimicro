import axios from "axios";
import { useEffect, useState } from "react";
import { COMMENT_ENDPOINT } from "./const";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(
      `${COMMENT_ENDPOINT}/posts/${postId}/comments`
    );

    if (response) {
      setComments(response.data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
