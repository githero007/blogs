import './App.css'
import { SignUp } from './components/SignUp';
import { Login } from './components/LogIn';
import { ViewBlog } from './components/ViewBlog';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { PostBlog } from './components/postBlog';
function App() {

  return (
    <>
      <RecoilRoot>
        {/* <SignUp /> */}
        {/* <Login /> */}
        {/* <PostBlog></PostBlog> */}
        <ViewBlog></ViewBlog>
      </RecoilRoot>
    </>
  )
}

export default App
