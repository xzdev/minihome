import React, { PropTypes } from 'react';
import styles from './styles.css';

const defaultBlog = {
  id: 0,
  title: '',
  content: '',
  publishTime: 0,
};

const Blog = ({ blog = defaultBlog }) => (
  <div className={styles.blog} key={blog.id}>
    <div className={styles.title}>{blog.title}</div>
    <div className="content">{blog.content}</div>
    <div className="time">{new Date(blog.publishTime).toDateString()}</div>
  </div>
);

Blog.propTypes = {
  blog: PropTypes.object,
};

Blog.defaultProps = {
  blog: defaultBlog,
};

export default Blog;
