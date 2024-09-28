import { useEffect, useState } from 'react';
import tokenState, { blogState } from '../atoms/atom.jsx';
import axios from "axios";
import { useRecoilState } from "recoil";

export function PostBlog() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [blog, setBlog] = useRecoilState<string>(blogState);
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

    }, [setToken]); // Added setToken to the dependency array

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

            // Assuming the response contains the blogId
            const blogId = response.data.blogId;

            // Set blogId in localStorage
            if (blogId) {
                localStorage.setItem("blog", JSON.stringify(blogId));
                console.log("Blog ID saved to localStorage:", blogId);
            }
        }
        catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of the blog"
                name="titleBox"
                id=""
            />
            <br />
            <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the body of the blog"
                name=""
                id=""
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}
