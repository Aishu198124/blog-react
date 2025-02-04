import React, { useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');  // New state for description

  // Function to handle the publish button click
  const handlePublish = () => {
    // Create an object with the blog data, including the new description
    const blog = {
      title,
      content,
      description,  // Add description to the blog object
      likes: 0,      // Set initial likes to 0
      views: 0,      // Set initial views to 0
    };

    // Get the existing blogs from localStorage (or an empty array if no blogs exist)
    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Add the new blog to the existing blogs array
    existingBlogs.push(blog);

    // Save the updated blogs array to localStorage
    localStorage.setItem('blogs', JSON.stringify(existingBlogs));

    // Clear the form fields
    setTitle('');
    setContent('');
    setDescription('');  // Clear description field

    // Optionally: Alert or confirm that the blog is published
    alert('Blog Published Successfully!');
  };

  return (
    <div>
      <p>Create a Brand New Blog</p>

      {/* Title input */}
      <input
        type="text"
        placeholder="Add Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
      />

      {/* Description input */}
      <input
        type="text"
        placeholder="Add a Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state
      />

      {/* Content textarea */}
      <textarea
        placeholder="Start writing Your Blog here."
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update content state
      />

      {/* Publish button */}
      <button onClick={handlePublish}>Publish Blog</button>
    </div>
  );
};

export default CreateBlog;
