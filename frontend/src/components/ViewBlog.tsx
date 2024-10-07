import { useState, useEffect } from 'react';
import tokenState from '../atoms/atom.jsx';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Session } from './Session.js'; // Import Session component
import './viewBlog.css'; // Import the CSS for styling

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
        } else {
            setSessionExpired(true);
        }
    }, [setToken]); //

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                console.log("No token available, skipping fetch.");
                return;
            }
            try {
                const response = await axios.get('https://hono-src.aayush68n.workers.dev/api/v1/blog/bulk', {
                    headers: {
                        Authorization: token,
                    },
                });
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        if (!sessionExpired) {
            fetchData();
        }
    }, [token, sessionExpired]);

    return (
        <>
            {sessionExpired ? (
                <Session />
            ) : (
                <div className="cardContainer">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blogCard">
                            <h2 className="blogTitle">{blog.title}</h2>
                            <p className="blogContent">{blog.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
