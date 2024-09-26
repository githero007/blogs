import { useEffect, useState } from 'react';
import tokenState from '../atoms/atom.jsx';
import axios from "axios";
import { useRecoilState } from "recoil";
export function PostBlog() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);
    useEffect(() => {
        const fetchLocalTokens = localStorage.getItem("token");
        if (fetchLocalTokens) {
            const cleanedToken = JSON.parse(fetchLocalTokens);
            setToken(cleanedToken);
        }
        console.log(token);

    }, []);
    async function handleSubmit() {
        try {
            console.log(token);
            setPublished(true);
            const response = await axios.post('http://127.0.0.1:8787/api/v1/blog/postblog', {

                title: title,
                content: content,
                published: published
            }, {
                headers: {
                    'Authorization': token,
                }
            });
            console.log(response.data);
        }
        catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
        }

    }
    return (<>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter the title of the blog" name="titleBox" id="" />
        <br></br>
        <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="enter the body of the blog" name="" id="" />
        <button onClick={handleSubmit}>submit</button>
    </>)
}