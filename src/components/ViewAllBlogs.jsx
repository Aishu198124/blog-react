import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs from localStorage when the component mounts
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs); // Set all blogs to the state
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index}>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <p>Likes: {blog.likes} | Views: {blog.views}</p>
              <Link to={`/viewblog/${index}`}>
                <button>View Full Blog</button>
              </Link>
              <p>---------------</p>             
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default ViewAllBlogs;
