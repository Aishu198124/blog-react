import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullBlogView = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', content: '', description: '', likes: 0, views: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(''); 
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = storedBlogs[index];
    setBlog(selectedBlog);
    const storedComments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
    setComments(storedComments);
  }, [index]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedBlog = { ...blog };
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    storedBlogs[index] = updatedBlog;
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setBlog(updatedBlog);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    storedBlogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleLike = () => {
    const updatedBlog = { ...blog };
    updatedBlog.likes += 1;
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    storedBlogs[index] = updatedBlog;
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setBlog(updatedBlog);
  };

  const handleAddComment = () => {
    if (comment.trim() === '') return;
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem(`comments-${index}`, JSON.stringify(newComments));
    setComment('');
  };

  const handleDeleteComment = (commentToDelete) => {
    const updatedComments = comments.filter((c) => c !== commentToDelete);
    setComments(updatedComments);
    localStorage.setItem(`comments-${index}`, JSON.stringify(updatedComments));
  };

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {isEditing ? (
        <div>
          <p className="text-xs text-gray-400">Blog Title</p>
          <input type="text" name="title" value={blog.title} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Edit Title"  />
          <p className="text-xs text-gray-400">Author</p>
          <input type="text" name="author" value={blog.author} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Edit Author Name"  />
          <p className="text-xs text-gray-400">Description</p>
          <input type="text" name="description" value={blog.description} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Edit Description" />
          <p className="text-xs text-gray-400">Content</p>
          <textarea name="content"  value={blog.content} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-64" placeholder="Edit Content" />

          <div className="flex space-x-4">
            <button onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" >Save Changes</button>
            <button onClick={() => setIsEditing(false)}className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="max-w-full break-words text-3xl font-bold text-gray-800 mb-4 whitespace-pre-wrap">{blog.title}<h1 className='text-xl text-green-800'>by {blog.author}</h1></h2>
          <p className="text-sm text-gray-500 mb-4 text-orange-500">Likes: {blog.likes} | Views: {blog.views}</p>
          <p className="text-xs text-gray-400">About the Blog</p>
          <p className="text-md text-gray-700 mb-4 whitespace-pre-wrap break-words">{blog.description}</p>
          <p className="text-xs text-gray-400">Content</p>
          <div className="text-lg text-gray-700 mb-4 whitespace-pre-wrap break-words">{blog.content}</div>
          
          <div className="flex mt-4 space-x-4">
            <button onClick={handleLike} className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Like</button>

            <button onClick={handleEdit} className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Edit the blog</button>
            <button onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"> Delete the blog</button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Comments</h3>
            <textarea placeholder="Add your comments here" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full h-20 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
            <button onClick={handleAddComment} className="px-6 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Comment</button>

            <div>
              {comments.slice(-5).map((comment, index) => (
                <div key={index} className="p-3 mb-2 bg-gray-100 rounded-md flex flex-col items-start">
                  <p className="text-gray-700 break-words whitespace-pre-wrap">{comment}</p>
                  <button onClick={() => handleDeleteComment(comment)} className="mt-2 text-red-500 hover:text-red-700"> Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullBlogView;
