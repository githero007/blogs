// @ts-nocheck
import './App.css';
import { SignUp } from './components/SignUp';
import { Login } from './components/LogIn';
import { ViewBlog } from './components/ViewBlog';
import { EditBlog } from './components/EditBlog';
import { PostBlog } from './components/PostBlog';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyBlogs } from './components/MyBlogs';
import { Navbar1 } from './components/Navbar';

function App() {
  return (
    <RecoilRoot>
      <Navbar1 />
      <Router>
        <Routes>
          <Route path="/" element={<ViewBlog />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/postblog" element={<PostBlog />} />
          <Route path="/editblog" element={<EditBlog />} />
          <Route path="/viewblog" element={<ViewBlog />} />
          <Route path="/myblog" element={<MyBlogs />} />
        </Routes>
      </Router>

    </RecoilRoot>
  );
}

export default App; ``
