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
    <div className="max-w-full mx-10 p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Create a Brand New Blog</h2>

      {/* Title input */}
      <input
        type="text"
        placeholder="Add Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
        className="w-full h-1/6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Description input */}
      {/* <input
        type="text"
        placeholder="Add a Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state
        className="w-full h-50 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      /> */}

      {/* Content textarea */}
      <textarea
        placeholder="Add a short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update content state
        className="w-full h-50 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {/* Content textarea */}
      <textarea
        placeholder="Start writing Your Blog here."
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update content state
        className="w-full h-200 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {/* Publish button */}
      <button
        onClick={handlePublish}
        className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Publish Blog
      </button>
    </div>
  );
};

export default CreateBlog;
