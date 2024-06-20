import React, { useState } from 'react';
import styles from '../css/MyBlogs.module.css';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const MyBlogs = () => {
  const [expanded, setExpanded] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
    { id: 3, title: 'Third Blog Post', content: 'This is the content of the third blog post.' },
  ]);

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

  const handleNewBlogSubmit = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { id: blogs.length + 1, ...newBlog }]);
    setNewBlog({ title: '', content: '' });
    setIsFormVisible(false);
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
