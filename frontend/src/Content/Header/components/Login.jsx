import { Link } from "react-router-dom";

export default function Login(){
    return (
        <Link to="/login">
            <button className='button-style'>Login</button>
        </Link>
    )
}