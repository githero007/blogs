import { useState } from "react";
import axios from 'axios';
import { useRecoilState } from "recoil";
import tokenState from '../atoms/atom.jsx';
import './SignUp.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function SignUp() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useRecoilState(tokenState);
    const navigate = useNavigate(); // Initialize useNavigate

    async function handleSubmit(): Promise<void> {
        try {
            const response = await axios.post('https://hono-src.aayush68n.workers.dev/api/v1/user/signup', {
                name: name,
                email: email,
                password: password,
            });
            console.log(response);
            const newToken = response.data.token; // Get the token from the response
            setToken(newToken); // Update the Recoil state with the token
            localStorage.setItem("token", JSON.stringify(newToken)); // Store the token in localStorage
            navigate('/viewBlog'); // Navigate to the viewBlog page

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.log("Error status code:", error.response.status);
                } else if (error.request) {
                    console.log("No response received:", error.request);
                }
            } else {
                console.log("An unexpected error occurred:", error);
            }
        }
    }

    return (
        <div className="signup-container"> {/* Apply the container class */}
            <h2>Sign Up</h2> {/* Added a heading for better UX */}
            <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
