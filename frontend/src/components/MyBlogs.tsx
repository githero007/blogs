import React, { useEffect, useState } from "react";
import tokenState, { blogState } from '../atoms/atom.jsx';
import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Session } from "./Session.tsx";
import './MyBlogs.css';

interface Blogs {
    id: string;
    title: string;
    content: string;
    published: boolean;
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
        } else {
            setSessionExpired(true);
        }
    }, [setToken]);

    async function fetchData() {
        try {
            const response = await axios.get("https://hono-src.aayush68n.workers.dev/api/v1/blog/myBlog", {
                headers: {
                    authorization: token,
                }
            });
            const myBlogs = response.data.blog;
            console.log(myBlogs);
            if (myBlogs) {
                setBlogs(myBlogs);
                console.log(myBlogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setSessionExpired(true); // Set session expired if there is an error
        }
    }

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    function handleEdit(blog: Blogs) {
        setBlogi(blog);
        localStorage.setItem("blog", JSON.stringify(blog));
        navigate("/editblog");
    }

    return (
        <>
            {sessionExpired ? (
                <Session /> // Correct session expired rendering
            ) : (
                <div className="blogsContainer">
                    {blogs.length === 0 ? ( // Use a ternary operator to check the length of blogs
                        <div>
                            Oops, you haven't added your blog yet.
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="blogCard">
                                <h1 className="blogTitle">{blog.title}</h1>
                                <p className="blogContent">{blog.content}</p>
                                <button className="editButton" onClick={() => handleEdit(blog)}>Edit</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}
