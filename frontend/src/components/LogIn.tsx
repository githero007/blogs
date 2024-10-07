// @ts-nocheck
import { useState } from "react";
import axios from "axios";
import tokenState from '../atoms/Atom.jsx';
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import './LogIn.css'; // Import the CSS file

export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useRecoilState<string>(tokenState);
    const navigate = useNavigate();

    async function handleLogin(): Promise<void> {
        try {
            const response = await axios.post("https://hono-src.aayush68n.workers.dev/api/v1/user/signup", {
                email: email,
                password: password,
            });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem("token", JSON.stringify(newToken));
            navigate('/viewblog');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log(error);
            }
        }
    }
    function handleSignUp() {
        navigate('/signUp')
    }

    return (
        <div className="login-container"> {/* Apply the container class */}
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="submit" onClick={handleLogin}>Login</button>
            <p>Dont have an acconunt</p>
            <button onClick={handleSignUp}> signUp</button>
        </div >
    );
}
