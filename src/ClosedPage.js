import React, {useState} from "react";
import {getMe} from "./logic";

const ClosedPage = (props) => {
    const [access, updateAccess] = useState(false);
    if (!access) getMe(props.history, updateAccess, props.setMsg);
    if (!access) return null;
    return (
        <div className="closedPage">
            Welcome to closed page!
            <button className="exitBtn" onClick={() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                props.setMsg('');
                updateAccess(false);
                props.history.push('/');
            }}>
                Exit
            </button>
        </div>
    )
}
export default ClosedPage;