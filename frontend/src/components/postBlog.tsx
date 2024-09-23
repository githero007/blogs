import { useEffect, useState } from 'react';
import tokenState from '../atoms/atom.jsx'
import { useRecoilState } from "recoil";
export function PostBlog() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);
    useEffect(() => {
        const fetchLocalTokens = localStorage.getItem("token");
        if (fetchLocalTokens) setToken(fetchLocalTokens);
    }, []);
    return (<>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter the title of the blog" name="titleBox" id="" />
        <br></br>
        <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="enter the body of the blog" name="" id="" />
        <button onClick={() => setPublished((published) => !published)}>submit</button>
    </>)
}