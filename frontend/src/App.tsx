import './App.css'
import { SignUp } from './components/SignUp';
import { Login } from './components/LogIn';
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
        <PostBlog></PostBlog>
      </RecoilRoot>
    </>
  )
}

export default App
