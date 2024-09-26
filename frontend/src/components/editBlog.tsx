import React, { useState } from "react";
import { tokenState } from '../atoms/atom,jsx';
import axios from "axios";
import { useRecoilState } from "recoil";
export function EditBlog() {
    const [token, setToken] = useState<string>(tokenState);
    async function fetchData() {
        const response = await axios.put("http://127.0.0.1:8787/api/v1/blog/postblog");

    }
    return (<>
        <input type="text" placeholder="" name="" id="" />
        <input type="text" name="" id="" />
    </>)
}