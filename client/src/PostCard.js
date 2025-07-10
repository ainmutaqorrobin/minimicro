import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostCard({ post }) {
  return (
    <div
      className="card bg-dark text-white"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  );
}

export default PostCard;
