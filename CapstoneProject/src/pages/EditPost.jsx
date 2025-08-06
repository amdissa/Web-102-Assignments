import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [secretKeyInput, setSecretKeyInput] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (!error) {
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.image_url);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (secretKeyInput !== post.secret_key) {
      alert("Invalid secret key!");
      return;
    }
    await supabase
      .from("posts")
      .update({ title, content, image_url: imageUrl })
      .eq("id", id);
    navigate(`/post/${id}`);
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter secret key"
          value={secretKeyInput}
          onChange={(e) => setSecretKeyInput(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
