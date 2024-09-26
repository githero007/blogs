import { useState, React, useEffect } from 'react'
import tokenState from '../atoms/atom.jsx'
import axios from 'axios';
import { useRecoilState } from 'recoil';
interface BlogPost {
    id: string;
    title: string;
    content: string;
    published: boolean;
}
export function ViewBlog() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    useEffect(() => {
        const fetchLocalTokens = localStorage.getItem("token");
        if (fetchLocalTokens) {
            const cleanToken: string = JSON.parse(fetchLocalTokens); // Ensure it is treated as a string
            setToken(cleanToken);
            console.log(token);
        }
    }, [setToken]);
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                console.log("No token available, skipping fetch."); // Log if no token
                return; // If there's no token, don't fetch data
            }
            try {
                console.log("Fetching blogs with token:", token); // Log before fetching
                const response = await axios.get('http://127.0.0.1:8787/api/v1/blog/bulk', {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log("Blogs fetched:", response.data.blogs);
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                if (error.response) {
                    console.log("Response data:", error.response.data);
                    console.log("Response status:", error.response.status);
                }
            }
        };
        fetchData();
    }, [token]);
    return (
        <>
            {blogs.map((blog) => {
                return (
                    <div key={blog.id}>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                    </div>
                )
            })}
        </>
    )
}