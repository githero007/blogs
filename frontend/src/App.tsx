import './App.css';
import { SignUp } from './components/SignUp';
import { Login } from './components/LogIn';
import { ViewBlog } from './components/ViewBlog';
import { EditBlog } from './components/EditBlog';
import { PostBlog } from './components/PostBlog';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/postblog" element={<PostBlog />} />
          <Route path="/viewblog" element={<ViewBlog />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
