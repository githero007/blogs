import React, { useState, useEffect } from "react";
import tokenState from '../atoms/atom.jsx';
import { blogState } from "../atoms/atom.jsx"; // Ensure blogState is correctly exported
import axios from "axios";
import { useRecoilState } from "recoil";

export function EditBlog() {
    const [token, setToken] = useState<string>(""); // Initialize with an empty string
    const [blogId, setBlogId] = useRecoilState(blogState); // Use Recoil to manage blog state
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [published, setPublished] = useState<boolean>(false);

    // Fetch the token from localStorage
    useEffect(() => {
        const fetchLocalToken = localStorage.getItem("token");
        if (fetchLocalToken) {
            const cleanedToken = JSON.parse(fetchLocalToken);
            setToken(cleanedToken);
        }
    }, []); // Removed 'token' from the dependency array to avoid infinite loops

    // Fetch the blog ID from localStorage
    useEffect(() => {
        const blogFromLocalStorage = localStorage.getItem("blog");
        if (blogFromLocalStorage) {
            const cleanBlogId = JSON.parse(blogFromLocalStorage);
            setBlogId(cleanBlogId);
        }
    }, [setBlogId]); // Set blogId when component mounts

    async function fetchData() {
        if (!blogId) {
            console.error("No blog ID found.");
            return;
        }

        try {
            const response = await axios.put(
                "http://127.0.0.1:8787/api/v1/blog/postblog",
                {
                    id: blogId, // Use the state blogId here
                    title: title,
                    content: content,
                    published: published // Include published status if necessary
                },
                {
                    headers: {
                        Authorization: token // Properly format the Authorization header
                    }
                }
            );
            console.log(response.data); // Handle response data as needed
        } catch (error) {
            console.error("Error updating the blog post:", error);
        }
    }

    return (
        <>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your edited title"
            />
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Use setContent for content input
                placeholder="Enter your edited content"
            />
            <button onClick={fetchData}>Update Blog</button> {/* Button to trigger fetchData */}
        </>
    );
}
