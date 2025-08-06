import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from "../supabaseClient";


export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  async function fetchPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
    setPost(data);
  }

  async function fetchComments() {
    const { data } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: false });
    setComments(data);
  }

  async function handleUpvote() {
    await supabase.rpc('increment', { row_id: id });
    fetchPost();
  }

  async function handleComment() {
    if (!commentText) return;
    await supabase.from('comments').insert([{ post_id: id, content: commentText }]);
    setCommentText('');
    fetchComments();
  }

  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', id);
    navigate('/');
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt="" width="300" />}
      <p>{post.content}</p>
      <p>Upvotes: {post.upvotes}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>

      <h3>Comments</h3>
      {comments.map(c => (
        <p key={c.id}>{c.content}</p>
      ))}
      <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment" />
      <button onClick={handleComment}>Comment</button>
    </div>
  );
}
