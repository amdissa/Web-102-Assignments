import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./CreatePost.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !content) {
    alert("Please fill out title and content");
    return;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, image_url: imageUrl }]);

  if (error) {
    console.error("Supabase insert error:", error);
    alert(`Failed to create post: ${error.message}`);
  } else {
    console.log("Inserted post:", data);
    navigate("/");
  }
};


  

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}
