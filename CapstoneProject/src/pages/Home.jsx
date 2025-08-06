import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Home.css"; // Optional CSS

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [sortBy, search]);

  async function fetchPosts() {
    let query = supabase
      .from("posts")
      .select("*")
      .order(sortBy, { ascending: sortBy === "created_at" ? false : true });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
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
          <option value="title">Title</option>
        </select>
        <Link to="/create" className="new-post-btn">+ New Post</Link>
      </div>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }} 
                />
              )}
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
