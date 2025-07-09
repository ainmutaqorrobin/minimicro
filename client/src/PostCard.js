function PostCard({ post }) {
  return (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
      </div>
    </div>
  );
}

export default PostCard;
