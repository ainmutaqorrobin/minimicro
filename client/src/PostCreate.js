import { useState } from "react";
import axios from "axios";
import { POST_ENDPOINT_DEPLOYMENT } from "./const";
function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${POST_ENDPOINT_DEPLOYMENT}/posts/create`,
      { title }
    );
    if (response) {
      setTitle("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
