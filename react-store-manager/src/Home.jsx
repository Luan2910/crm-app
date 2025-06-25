import './home.css'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">
            <h1>My CRM</h1>
            <div className='links'>
                <Link to="/products">Products</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/auth">Login</Link>
                <Link to="/auth">Signin</Link>
            </div>
        </div>
    )
}
