import { useState } from "react";
import axios from "axios";
import tokenState from '../atoms/atom.jsx'
import { useRecoilState } from "recoil";
export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useRecoilState<string>(tokenState);
    async function handleLogin(): Promise<void> {
        try {
            const response = await axios.post('http://127.0.0.1:8787/api/v1/user/login', {
                email: email,
                password: password,
            });
            setToken(response.data.token);
            if (token) console.log(token);
        } catch (error) {
            console.log(error);
        }
        localStorage.setItem("token", JSON.stringify(token));
    }
    return (<>
        <input type="text" name="" onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" id="" />
        <input type="text" name="" onChange={(e) => setPassword(e.target.value)} placeholder="enter your password" id="" />
        <button type="submit" onClick={handleLogin}>login</button>

    </>)
}