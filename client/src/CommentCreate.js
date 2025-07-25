import { useState } from "react";
import axios from "axios";
import { POST_ENDPOINT_DEPLOYMENT } from "./const";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${POST_ENDPOINT_DEPLOYMENT}/posts/${postId}/comments`,
      { content }
    );

    if (response) setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default CommentCreate;
