import LightMode from './components/LightMode';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Heading from './components/Heading';
import Login from './components/Login';



export default function Header() {
    const user = useSelector((state) => state.userReducer);
    // const user = feedData[0].user;
    // console.log(user);

    return(
        <section className='flex justify-between w-full bg-background-color transition-theme p-5 border-b-2 border-slate-500'>
            <Heading isSmol={true}/>
            <div className="flex items-center gap-3">
                {(user.username === null)
                    ? <Login/>
                    : <Link to={`/profile/you`} className='font-bold'>{user.username}</Link>
                }
                <LightMode/>
            </div>
        </section>
    )
}