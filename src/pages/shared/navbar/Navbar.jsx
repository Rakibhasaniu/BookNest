import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
    const { user,logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <nav className="bg-grey shadow-md">
            <div>
                <ul className="list-none flex h-[60px] items-center justify-between">

                    <li className="list-none ms-8"> <Link to="/">Home</Link></li>
                    <li> <Link to="/wishlist">Wishlist</Link></li>
                    <li>About Us</li>
                    <li>Books</li>
                    {
                        user ?
                            <Link>
                                <li onClick={handleLogOut} className="me-8">Log Out</li>
                            </Link>
                            :
                            <Link  to="/login">

                                <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                                    Login
                                </button>
                            </Link>
                    }

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
