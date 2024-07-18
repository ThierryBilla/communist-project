import React, { useState, useEffect } from 'react';
import styles from '../css/MyBlogs.module.css';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const MyBlogs = () => {
  const { token } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/posts/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(data); // Mettre à jour l'état avec les données récupérées
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    }

    if (token) {
      fetchBlogs();
    }
  }, [token]);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleEdit = (id) => {
    alert(`Edit blog post ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete blog post ${id}`);
  };

  const handleNewBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleNewBlogSubmit = async (e) => {
    e.preventDefault();

    if (newBlog.title.length < 4 || newBlog.title.length > 255 || newBlog.content.length < 5 || newBlog.content.length > 1000) {
      alert("Title must be between 4 and 255 characters, and content must be between 5 and 1000 characters.");
      return;
    }

    if (token) {
      try {
        const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/posts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlog),
        });

        if (response.ok) {
          const createdBlog = await response.json();
          setBlogs([...blogs, createdBlog]);
          setNewBlog({ title: '', content: '' });
          setIsFormVisible(false);
        } else {
          console.error('Failed to create blog post');
        }
      } catch (error) {
        console.error('Error creating blog post:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Blogs</h1>
      <ul className={styles.blogList}>
        {blogs.map((blog) => (
          <li key={blog.id} className={styles.blogItem}>
            <div className={styles.blogHeader} onClick={() => toggleExpand(blog.id)}>
              <div className={styles.blogTitle}>{blog.title}</div>
              <div className={styles.blogActions}>
                <FaEdit className={styles.icon} onClick={(e) => { e.stopPropagation(); handleEdit(blog.id); }} />
                <FaTrashAlt className={styles.icon} onClick={(e) => { e.stopPropagation(); handleDelete(blog.id); }} />
              </div>
            </div>
            {expanded === blog.id && (
              <div className={styles.blogContent}>
                {blog.content}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.floatingButton} onClick={() => setIsFormVisible(!isFormVisible)}>
        <FaPlus />
      </div>
      {isFormVisible && (
        <div className={styles.formBubble}>
          <form onSubmit={handleNewBlogSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newBlog.title}
              onChange={handleNewBlogChange}
              className={styles.input}
              required
            />
            <textarea
              name="content"
              placeholder="Content"
              value={newBlog.content}
              onChange={handleNewBlogChange}
              className={styles.textarea}
              required
            ></textarea>
            <div className={styles.formActions}>
              <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add</button>
              <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={() => setIsFormVisible(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
