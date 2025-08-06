import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [sortBy, search]);

  async function fetchPosts() {
    setLoading(true);
    let query = supabase
      .from("posts")
      .select("*")
      .order(sortBy, { ascending: sortBy !== "created_at" });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
    setLoading(false);
  }

  async function upvotePost(id, currentUpvotes) {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: currentUpvotes + 1 })
      .eq("id", id);

    if (!error) {
      // Update the local state instantly
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, upvotes: (p.upvotes || 0) + 1 } : p
        )
      );
    }
  }

  return (
    <div className="home-container">
      <h1>Beauty & Fashion Lookbook</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvotes</option>
          <option value="title">Title (A–Z)</option>
        </select>
        <Link to="/create" className="new-post-btn">+ New Post</Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <Link to={`/post/${post.id}`} className="post-link">
                <h3>{post.title}</h3>
              </Link>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "300px",
                    objectFit: "cover",
                    // display: "block",
                    marginTop: "10px",
                    borderRadius: "8px"
                  }}
                />
              )}
              <p>Created: {new Date(post.created_at).toLocaleString()}</p>
              <p>Upvotes: {post.upvotes || 0}</p>
              <button onClick={() => upvotePost(post.id, post.upvotes || 0)}>
                Upvote
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
