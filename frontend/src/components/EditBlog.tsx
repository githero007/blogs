// @ts-nocheck
import React, { useState, useEffect } from "react";
import tokenState from '../atoms/Atom.jsx';
import { blogState } from "../atoms/Atom.jsx"; // Ensure blogState is correctly exported
import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Session } from "./Session.js";
import './editBlog.css'

export function EditBlog() {
    const [token, setToken] = useState<string>(''); // Initialize token with an empty string
    const [blogId, setBlogId] = useRecoilState(blogState); // Use Recoil to manage blog state
    const [title, setTitle] = useState<string>("");
    const [cleanedTitle, setCleanedTitle] = useState('');
    const [cleanedContent, setCleanedContent] = useState('');
    const [content, setContent] = useState<string>("");
    const [published, setPublished] = useState<boolean>(false);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false); // Track session expiration
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocalToken = localStorage.getItem("token");
        if (fetchLocalToken) {
            const cleanedToken = JSON.parse(fetchLocalToken);
            setToken(cleanedToken);
        } else {
            setSessionExpired(true); // Trigger session expired state
        }

        const fetchLocalBlog = localStorage.getItem("blog");
        if (fetchLocalBlog) {
            const cleanedBlog = JSON.parse(fetchLocalBlog);
            console.log(cleanedBlog);
            setCleanedTitle(cleanedBlog.title);
            setCleanedContent(cleanedBlog.content);
            setBlogId(cleanedBlog.id);
        }
    }, [setToken, setBlogId]);

    async function fetchData() {
        try {
            const response = await axios.put(
                `${process.env.URL}/api/v1/blog/postblog`,
                {
                    id: blogId,
                    title: title,
                    content: content,
                },
                {
                    headers: {
                        Authorization: token, // Properly format the Authorization header
                    },
                }
            );
            console.log(response.data); // Handle response data as needed
            alert("the blog has been edited");
            navigate('/viewblog');
        } catch (error) {
            console.error("Error updating the blog post:", error);
        }
    }

    return (
        <div className="editContainer">
            {sessionExpired ? (
                <Session /> // Render Session component if session is expired
            ) : (
                <div className="mainContent">
                    <input className="titleContainer"
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setCleanedTitle(e.target.value);
                        }}
                        value={cleanedTitle}
                    />
                    <textarea className="contentContainer"
                        type="text"
                        value={cleanedContent}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setCleanedContent(e.target.value);
                        }} // Use setContent for content input
                    />
                    <button className="updateButton" onClick={fetchData}>Update Blog</button> {/* Button to trigger fetchData */}
                </div>
            )}
        </div>
    );
}
