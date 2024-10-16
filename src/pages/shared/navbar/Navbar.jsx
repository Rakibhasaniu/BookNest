import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext)
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
                                <li className="me-8">Log Out</li>
                            </Link>
                            :
                            <Link to="/login">

                                <li className="me-8">Login</li>
                            </Link>
                    }

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
