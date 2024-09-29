import React, { useEffect, useState } from "react";
import tokenState, { blogState } from '../atoms/atom.jsx';
import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Session } from "./Session.js";
interface Blogs {
    id: string
    title: string,
    content: string,
    published: boolean,
}
export function MyBlogs() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [blogi, setBlogi] = useRecoilState(blogState);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLocalTokens = localStorage.getItem("token");
        if (fetchLocalTokens) {
            const cleanToken = JSON.parse(fetchLocalTokens);
            console.log(cleanToken);
            setToken(cleanToken);
        }
        else {
            setSessionExpired(true);
        }
    }, [setToken]);
    async function fetchData() {
        const response = await axios.get("http://127.0.0.1:8787/api/v1/blog/myBlog", {
            headers: {
                authorization: token,
            }
        });
        const myBlogs = response.data.blog;
        console.log(myBlogs);
        if (myBlogs) {
            setBlogs(myBlogs);
            console.log(blogs);
        }
    }
    useEffect(() => {
        if (token) fetchData();
    }, [token]);
    function handleEdit(blog) {
        navigate("/editblog");
        setBlogi(blog);
        console.log(blogi);
        localStorage.setItem("blog", JSON.stringify(blog));

    }
    return (
        <>
            {sessionExpired ? (
                <Session /> // Correct session expired rendering
            ) : (
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                        <button onClick={() => handleEdit(blog)}>Edit</button>
                    </div>
                ))
            )}
        </>
    );

}