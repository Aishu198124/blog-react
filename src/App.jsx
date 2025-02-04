import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateBlog from './components/CreateBlog';
import Explore from './components/Explore';
import ViewAllBlogs from './components/ViewAllBlogs';
import FullBlogView from './components/FullBlogView';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default route */}
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/viewallblogs" element={<ViewAllBlogs />} />
          <Route path="/viewblog/:index" element={<FullBlogView />}/>
        </Routes>     
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <h2>Welcome to BlogyTails!</h2>
      <p>Start your blogging journey!</p>

      <Link to="/createblog">
          <button>Create Blog</button>
      </Link>

          <p>Explore Blogs</p>
          <div><Explore /></div>

    </div>
  );
}

export default App;
