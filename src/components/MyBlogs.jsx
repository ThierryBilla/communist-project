import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/MyBlogs.module.css';
import { FaEdit, FaTrashAlt, FaPlus, FaSave, FaTimes, FaBold, FaItalic, FaUnderline, FaTextHeight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const MyBlogs = () => {
  const { token } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('https://communistdate-0f582f5caf12.herokuapp.com/posts/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched blog posts data:', data);
        setBlogs(data);
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

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setExpanded(blog.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        console.error('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const handleNewBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleEditBlogChange = (e) => {
    const { name, value } = e.target;
    setEditBlog({ ...editBlog, [name]: value });
  };

  const handleNewBlogSubmit = async (e) => {
    e.preventDefault();

    const content = contentEditableRef.current.innerHTML;
    if (newBlog.title.length < 4 || newBlog.title.length > 255 || content.length < 5 || content.length > 1000) {
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
          body: JSON.stringify({ ...newBlog, content }),
        });

        if (response.ok) {
          const createdBlog = await response.json();
          setBlogs([...blogs, createdBlog]);
          setNewBlog({ title: '', content: '' });
          setIsFormVisible(false);
          contentEditableRef.current.innerHTML = ''; // Clear the editable content
        } else {
          console.error('Failed to create blog post');
        }
      } catch (error) {
        console.error('Error creating blog post:', error);
      }
    }
  };

  const handleEditBlogSubmit = async (e) => {
    e.preventDefault();

    const content = contentEditableRef.current.innerHTML;
    if (editBlog.title.length < 4 || editBlog.title.length > 255 || content.length < 5 || content.length > 1000) {
      alert("Title must be between 4 and 255 characters, and content must be between 5 and 1000 characters.");
      return;
    }

    if (token) {
      try {
        const response = await fetch(`https://communistdate-0f582f5caf12.herokuapp.com/posts/${editBlog.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...editBlog, content }),
        });

        if (response.ok) {
          const updatedBlog = await response.json();
          setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
          setEditBlog(null);
        } else {
          console.error('Failed to update blog post');
        }
      } catch (error) {
        console.error('Error updating blog post:', error);
      }
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const toggleFontSize = () => {
    const selection = document.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;
    const currentFontSize = window.getComputedStyle(parentElement).fontSize;

    if (currentFontSize === '16px') {
      formatText('fontSize', '4'); // Set to a larger size
    } else {
      formatText('fontSize', '3'); // Reset to normal size
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
                <FaEdit className={styles.icon} onClick={(e) => { e.stopPropagation(); handleEdit(blog); }} />
                <FaTrashAlt className={styles.icon} onClick={(e) => { e.stopPropagation(); handleDelete(blog.id); }} />
              </div>
            </div>
            {expanded === blog.id && (
              <div className={styles.blogContent}>
                {editBlog && editBlog.id === blog.id ? (
                  <form onSubmit={handleEditBlogSubmit}>
                    <input
                      type="text"
                      name="title"
                      value={editBlog.title}
                      onChange={handleEditBlogChange}
                      className={styles.input}
                      required
                    />
                    <div className={styles.toolbar}>
                      <button type="button" onClick={() => formatText('bold')}><FaBold className={styles.icon} /></button>
                      <button type="button" onClick={() => formatText('italic')}><FaItalic className={styles.icon} /></button>
                      <button type="button" onClick={() => formatText('underline')}><FaUnderline className={styles.icon} /></button>
                      <button type="button" onClick={toggleFontSize}><FaTextHeight className={styles.icon} /></button>
                    </div>
                    <div
                      ref={contentEditableRef}
                      contentEditable
                      className={styles.textarea}
                      dangerouslySetInnerHTML={{ __html: editBlog.content }}
                    />
                    <div className={styles.formActions}>
                      <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        <FaSave />
                      </button>
                      <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={() => setEditBlog(null)}>
                        <FaTimes />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )}
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
            <div className={styles.toolbar}>
              <button type="button" onClick={() => formatText('bold')}><FaBold className={styles.icon} /></button>
              <button type="button" onClick={() => formatText('italic')}><FaItalic className={styles.icon} /></button>
              <button type="button" onClick={() => formatText('underline')}><FaUnderline className={styles.icon} /></button>
              <button type="button" onClick={toggleFontSize}><FaTextHeight className={styles.icon} /></button>
            </div>
            <div
              ref={contentEditableRef}
              contentEditable
              className={styles.textarea}
              placeholder="Content"
            />
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
