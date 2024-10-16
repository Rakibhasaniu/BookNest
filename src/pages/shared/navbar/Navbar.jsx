const Navbar = () => {
    return (
        <nav className="bg-grey shadow-md">
            <div>
                <ul className="list-none flex h-[60px] items-center justify-between">

                    <li className="list-none ms-8">Home</li>
                    <li>About Us</li>
                    <li>Books</li>
                    <li className="me-8">Contact Us</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
