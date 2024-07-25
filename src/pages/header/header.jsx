import { HiMenu } from "react-icons/hi";
import '../../styles/header.css'
import { Link, useLocation } from "react-router-dom";
import { removeToken } from "../../utils/tokenUtils";
const Header = () => {

    const location = useLocation();

    return (
        <div className="header flex items-center justify-between bg-blue-600 pe-2 ps-2">
            <h1><HiMenu style={{ color: 'white' }} /></h1>
            <div className="flex items-center pe-4">
                {location.pathname === '/' && (
                    <>
                        <Link to="/">
                            <button className="me-3 bg-white text-blue-600 px-2 py-1 rounded-md">Login</button>
                        </Link>
                        <Link to="/signUp">
                            <button className="text-white">SignUp</button>
                        </Link>
                    </>
                )}
                {location.pathname === '/signUp' && (
                    <>
                        <Link to="/">
                            <button className="me-3 text-white">Login</button>
                        </Link>
                        <Link to="/signUp">
                            <button className=" bg-white text-blue-600 px-2 py-1 rounded-md">SignUp</button>
                        </Link>
                    </>
                )}
                {location.pathname === '/landingPage' && (

                    <Link to='/'>
                        <button className="me-3 bg-red-400 text-white px-2 py-1 rounded-md" onClick={removeToken()}>Logout</button>
                    </Link>
                )}
            </div>
        </div>

    );
}

export default Header;