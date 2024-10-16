import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-grey shadow-md">
            <div>
                <ul className="list-none flex h-[60px] items-center justify-between">

                    <li className="list-none ms-8"> <Link to="/">Home</Link></li>
                    <li> <Link to="/wishlist">Wishlist</Link></li>
                    <li>About Us</li>
                    <li>Books</li>
                    <li className="me-8">Contact Us</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
