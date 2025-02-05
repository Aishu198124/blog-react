import React, { useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState(''); 

  const handlePublish = () => {
    const blog = {title, content, description,likes: 0, views: 0 };
    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    existingBlogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(existingBlogs));
    setTitle('');
    setContent('');
    setDescription('');
    alert('Blog Published Successfully!');
  };

  return (
    <div className="max-w-full mx-10 p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Create a Brand New Blog</h2>
      <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-1/6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea placeholder="Add a short Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-50 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      <textarea placeholder="Start writing Your Blog here." value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-200 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"  />
      <button onClick={handlePublish} className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Publish Blog</button>
    </div>
  );
};

export default CreateBlog;
