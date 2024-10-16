import { useState, useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

const Home = () => {
    const [books] = useBooks();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [wishlist, setWishlist] = useState([]); // State for wishlist

    useEffect(() => {
        // Load wishlist from local storage
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    useEffect(() => {
        // Extract unique genres from the book list
        if (books && books.results) {
            const allGenres = books.results.flatMap(book => book.subjects || []);
            setGenres([...new Set(allGenres)]);
        }
    }, [books]);

    const handleWishlistToggle = (bookId) => {
        console.log(bookId)
        const updatedWishlist = wishlist.includes(bookId)
            ? wishlist.filter(id => id !== bookId) // Remove from wishlist
            : [...wishlist, bookId]; // Add to wishlist

        setWishlist(updatedWishlist);
        console.log(wishlist)
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update local storage
    };

    const filteredBooks = books?.results?.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const genreMatch = selectedGenre ? book.subjects.includes(selectedGenre) : true;
        return titleMatch && genreMatch;
    });

    const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBooks = filteredBooks?.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>

            <div className="flex justify-between items-center mb-8">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="border rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            {currentBooks && currentBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentBooks.map((book) => (
                        <div key={book.id} className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300 relative">
                            <img 
                                src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"} 
                                alt={book.title} 
                                className="h-48 w-full object-cover rounded-md mb-4" 
                            />
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p className="text-gray-600">by {book.authors.map((author) => author.name).join(", ")}</p>
                            <p className="text-gray-500">Genre: {book.subjects && book.subjects.length > 0 ? book.subjects[0] : "N/A"}</p>
                            <p className="text-gray-400 text-sm">ID: {book.id}</p>

                            {/* Wishlist Icon */}
                            <button
                                onClick={() => handleWishlistToggle(book.id)}
                                className="absolute top-4 right-4"
                            >
                                {wishlist.includes(book.id) ? (
                                    <FaHeart className="text-red-500" /> // Filled heart for wishlisted
                                ) : (
                                    <FaRegHeart className="text-gray-400" /> // Outlined heart for non-wishlisted
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No books found...</p>
            )}

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="mx-2 p-2 border rounded-lg shadow-md bg-blue-500 text-white disabled:bg-gray-300"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 p-2 border rounded-lg shadow-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="mx-2 p-2 border rounded-lg shadow-md bg-blue-500 text-white disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
