import { useState } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { useRecoilState, useRecoilValue } from "recoil";
import tokenState from '../atoms/atom.jsx'


export function SignUp() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useRecoilState(tokenState);
    async function handleSubmit(): Promise<void> {
        try {
            const response = await axios.post('http://127.0.0.1:8787/api/v1/user/signup', {
                name: name,
                email: email,
                password: password,
            });
            console.log(response);
            setToken(response.data.token);
            if (token) console.log(`jsont token is ${token}`);

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
    return (<>
        <input type="text" name="" placeholder="enter your name" id="" onChange={(e) => setName(e.target.value)} /><br></br>
        <input type="text" name="" placeholder="enter your email" id="" onChange={(e) => setEmail(e.target.value)} /><br></br>
        <input type="text" name="" placeholder="enter your password" id="" onChange={(e) => setPassword(e.target.value)} /><br></br>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </>)
}