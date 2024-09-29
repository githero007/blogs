import React from "react";
import { useNavigate } from "react-router-dom";
export function Session() {
    const navigate = useNavigate();
    return (<>
        <img src="" alt="" srcset="" />
        <div className="warning">the session has expired redirecting you to login</div>
        {setTimeout(() => navigate('/login'), 2000)}
    </>)
}