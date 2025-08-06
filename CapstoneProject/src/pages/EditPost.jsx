import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch the post to prefill form
  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('title, content, image_url')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else if (data) {
        setTitle(data.title);
        setContent(data.content || '');
        setImageUrl(data.image_url || '');
      }
    }

    fetchPost();
  }, [id]);

  // Handle update
  async function handleUpdate(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .update({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } else {
      navigate(`/post/${id}`);
    }
  }

  return (
    <div>
      <h1>Edit Look</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
