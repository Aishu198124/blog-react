import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullBlogView = () => {
  const { index } = useParams(); // Get the index from the URL
  const navigate = useNavigate(); // For navigation after deletion
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    description: '',
    likes: 0,
    views: 0,
  });

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Fetch the blog based on the index when the component mounts
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = storedBlogs[index]; // Get the blog by its index
    setBlog(selectedBlog); // Set the selected blog to state
  }, [index]);

  // Handle editing the blog
  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  // Handle saving the edited blog
  const handleSave = () => {
    const updatedBlog = { ...blog }; // Create a copy of the blog object

    // Get the existing blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Update the blog in the array
    storedBlogs[index] = updatedBlog;

    // Save the updated blogs array back to localStorage
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));

    // Update the state to reflect the changes
    setBlog(updatedBlog);
    setIsEditing(false); // Disable edit mode
  };

  // Handle deleting the blog
  const handleDelete = () => {
    // Get the existing blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Remove the blog at the specified index
    storedBlogs.splice(index, 1);

    // Save the updated blogs array back to localStorage
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));

    // Redirect to the explore page after deletion
    navigate('/');
  };

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  if (!blog) return <p>Blog not found.</p>; // If the blog is not found, show a message

  return (
    <div>
      {isEditing ? (
        <div>
          {/* Editable Title */}
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
          />

          {/* Editable Description */}
          <input
            type="text"
            name="description"
            value={blog.description}
            onChange={handleChange}
          />

          {/* Editable Content */}
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
          />

          <div>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <div>{blog.content}</div>
          <p>Likes: {blog.likes} | Views: {blog.views}</p>

          {/* Edit and Delete buttons */}
          <button onClick={handleEdit}>Edit the blog</button>
          <button onClick={handleDelete}>Delete the blog</button>
        </div>
      )}
    </div>
  );
};

export default FullBlogView;
