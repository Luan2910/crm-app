import { useContext, useState } from "react"
import { AuthContext } from "../../share/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const auth = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login();
        navigate (from, { replace: true })
    }
    return (
        <div>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input id="email" type="email" placeholder="Email" required />
                    <input id="password" type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
