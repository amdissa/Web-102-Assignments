import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./PostPage.css";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(data);
    }
    setLoading(false);
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
  }

  async function handleUpvote() {
    if (!post) return;

    // Always fetch latest count before updating
    const { data: freshPost, error: fetchError } = await supabase
      .from("posts")
      .select("upvotes")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching latest upvotes:", fetchError);
      return;
    }
console.log("Updating ID:", id, "Type:", typeof id);
console.log("Post data:", post);

    const updatedCount = (freshPost.upvotes || 0) + 1;

    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: updatedCount })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating upvotes:", error);
    } else {
      setPost(data);
    }
  }
  if (error) {
  console.error("Upvote update failed:", error);
} else {
  console.log("Upvote updated:", data);
}


  async function handleAddComment() {
    if (!newComment.trim()) return;
    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: id, content: newComment }]);
    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment("");
      fetchComments();
    }
  }

  async function handleDelete() {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="post-image" />
      )}
      <p>{post.content}</p>
      <p><strong>Upvotes:</strong> {post.upvotes || 0}</p>

      <div className="button-group">
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <h3>Comments</h3>
      <div className="comments-section">
        {comments.length > 0 ? (
          comments.map((c) => (
            <p key={c.id} className="comment">{c.content}</p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
}
