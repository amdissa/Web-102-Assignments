import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostPage({ posts, onUpvote, onDelete, onEdit, onAddComment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id.toString() === id);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <p>{post.description}</p>
      <p>Upvotes: {post.upvotes}</p>
      <div className="post-actions">
        <button onClick={() => onUpvote(post.id)}>Upvote</button>
        <button onClick={() => onEdit(post.id)}>Edit</button>
        <button onClick={() => {
          onDelete(post.id);
          navigate("/");
        }}>Delete</button>
      </div>

      <h3>Comments</h3>
      <div className="comments-section">
        {post.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <p className="comment" key={index}>{comment}</p>
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
