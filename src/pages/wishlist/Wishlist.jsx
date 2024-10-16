import { useEffect, useState } from "react";
import useBooks from "../../hooks/useBooks";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const Wishlist = () => {
    const [books,loading] = useBooks();
    const [wishlistBooks, setWishlistBooks] = useState([]);
    if (loading) {

        <p>Loading...</p>;
    }
       
    // Load wishlist from localStorage when the component mounts
    useEffect(() => {
        loadWishlist();
    }, [books]);

    // Function to load wishlist books from localStorage
    const loadWishlist = () => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Filter the books that are in the wishlist
        if (books && books.results) {
            const filteredBooks = books.results.filter(book => storedWishlist.includes(book.id));
            setWishlistBooks(filteredBooks);
        }
    };

    // Function to remove a book from the wishlist
    const handleRemoveFromWishlist = (bookId) => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Remove the book ID from the wishlist array
        const updatedWishlist = storedWishlist.filter(id => id !== bookId);

        // Update localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        // Update state to reflect the removal
        loadWishlist();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

            {/* Check if wishlistBooks exist and has content */}
            {wishlistBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistBooks.map((book) => (
                        <div key={book.id} className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300 relative">
                            {/* Heart icon to indicate wishlist (placed at the top-right corner) */}
                            <button 
                                onClick={() => handleRemoveFromWishlist(book.id)} 
                                className="absolute top-4 right-4"
                            >
                                <FaHeart className="text-red-500" size={24} />
                            </button>

                            {/* Book Cover */}
                            <img 
                                src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"} 
                                alt={book.title} 
                                className="h-48 w-full object-cover rounded-md mb-4" 
                            />
                            {/* Book Title */}
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            {/* Author */}
                            <p className="text-gray-600">by {book.authors.map((author) => author.name).join(", ")}</p>
                            {/* Genre */}
                            <p className="text-gray-500">Genre: {book.subjects && book.subjects.length > 0 ? book.subjects[0] : "N/A"}</p>
                            {/* ID */}
                            <p className="text-gray-400 text-sm">ID: {book.id}</p>

                            {/* Details Button */}
                            <Link to={`/books/${book.id}`}>
                                <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg">
                                    Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};

export default Wishlist;
