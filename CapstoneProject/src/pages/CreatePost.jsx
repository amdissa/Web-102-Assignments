import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl,
        secret_key: secretKey || null,
        upvotes: 0
      }
    ]);

    if (error) {
      console.error(error);
      alert("Error creating post");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="create-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Additional content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Secret key (optional)"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
