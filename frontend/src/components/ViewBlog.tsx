import { useState, React, useEffect } from 'react';
import tokenState from '../atoms/atom.jsx';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Session } from './Session.js'; // Import Session component

interface BlogPost {
    id: string;
    title: string;
    content: string;
    published: boolean;
}

export function ViewBlog() {
    const [token, setToken] = useRecoilState<string>(tokenState);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false); // Track session expiration
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchLocalTokens = localStorage.getItem("token");
        if (fetchLocalTokens) {
            const cleanToken: string = JSON.parse(fetchLocalTokens); // Ensure it is treated as a string
            setToken(cleanToken);
            console.log(cleanToken); // Log token
        } else {
            setSessionExpired(true); // Set session expired if no token found
        }
    }, [setToken]); // Removed navigate from the dependencies as it's not used inside this hook

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
        if (!sessionExpired) {
            fetchData(); // Fetch data only if session hasn't expired
        }
    }, [token, sessionExpired]); // Added sessionExpired to the dependencies

    return (
        <>
            {sessionExpired ? (
                <Session /> // Render Session component if session has expired
            ) : (
                blogs.map((blog) => {
                    return (
                        <div key={blog.id}>
                            <h1>{blog.title}</h1>
                            <p>{blog.content}</p>
                        </div>
                    );
                })
            )}
        </>
    );
}
