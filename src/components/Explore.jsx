import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Explore = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from localStorage when the component mounts
  useEffect(() => {
    // Get the blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Get the first 10 blogs from the array
    const first5Blogs = storedBlogs.slice(0, 5);

    // Set the blogs state with the first 10 blogs
    setBlogs(first5Blogs);
  }, []);

  return (
    <div>
      {/* Loop through the blogs and display them */}
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found.</p>
      )}

      <Link to="/viewallblogs">
            <button>More</button>
      </Link>
    </div>
  );
};

export default Explore;
