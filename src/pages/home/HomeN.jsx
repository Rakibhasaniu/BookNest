import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import useBooks from "../../hooks/useBooks";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import { motion } from "framer-motion";
import { HeartIcon } from "../../components/HeartIcon/HeartIcon";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const [books, loading] = useBooks();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    useEffect(() => {
        if (books && books.results) {
            const allGenres = books.results.flatMap(book => book.subjects || []);
            setGenres([...new Set(allGenres)]);
        }
    }, [books]);

    const handleWishlistToggle = (bookId) => {
        const updatedWishlist = wishlist.includes(bookId)
            ? wishlist.filter(id => id !== bookId)
            : [...wishlist, bookId];

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        // Show toast notification
        if (wishlist.includes(bookId)) {
            toast.success("Removed from wishlist!");
        } else {
            toast.success("Added to wishlist!");
        }
    };

    const filteredBooks = books?.results?.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const genreMatch = selectedGenre ? book.subjects.includes(selectedGenre) : true;
        return titleMatch && genreMatch;
    });

    const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBooks = filteredBooks?.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>BookNest| Home</title>
            </Helmet>
            <ToastContainer />
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
                        <motion.div
                            key={book.id}
                            className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col"
                            whileHover={{ scale: 1.05 }} 
                        >
                            <motion.img 
                                src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"} 
                                alt={book.title} 
                                className="h-48 w-full object-cover rounded-md mb-4"
                                whileHover={{ scale: 1.1 }} 
                                transition={{ duration: 0.3 }} 
                            />
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p className="text-gray-600">by {book.authors.map((author) => author.name).join(", ")}</p>
                            <p className="text-gray-500">Genre: {book.subjects && book.subjects.length > 0 ? book.subjects[0] : "N/A"}</p>
                            <p className="text-gray-400 text-sm">ID: {book.id}</p>

                            <div className="flex-grow" /> {/* This creates space between content and button */}
                            <button
                                onClick={() => handleWishlistToggle(book.id)}
                                className="top-4 right-4"
                            >
                                <HeartIcon isLiked={wishlist.includes(book.id)} />
                            </button>

                            {/* Details Button */}
                            <Link className="text-center" to={`/books/${book.id}`}>
                                <button className="mt-4 py-2 px-6 hover:bg-gray-600 bg-blue-500 text-white rounded-lg">
                                    Details
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No books found.</p>
            )}

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="mx-2 p-2 border hover:bg-gray-600 rounded-lg shadow-md bg-blue-500 text-white disabled:bg-gray-300"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 p-2 border hover:bg-gray-600 rounded-lg shadow-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="mx-2 p-2 px-6 border hover:bg-gray-600 rounded-lg shadow-md bg-blue-500 text-white disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
