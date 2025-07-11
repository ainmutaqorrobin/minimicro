function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    const statusMessages = {
      pending: "This comment is awaiting moderation",
      rejected: "This comment has been rejected.",
    };

    const content =
      comment.status === "approved" ? (
        comment.content
      ) : (
        <p className="font-weight-light">{statusMessages[comment.status]}</p>
      );

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

export default CommentList;
