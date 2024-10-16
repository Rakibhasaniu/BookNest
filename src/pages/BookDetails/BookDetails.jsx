import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBooks from "../../hooks/useBooks";
import { motion } from "framer-motion";

const BookDetails = () => {
    const { id } = useParams();
    const [books] = useBooks();
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (books && books.results) {
            const foundBook = books.results.find((book) => book.id === parseInt(id));
            setBook(foundBook);
        }
    }, [books, id]);

    if (!book) {
        return <p className="text-center mt-6">Loading book details...</p>;
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            className="w-full h-96 object-cover rounded-xl shadow-lg"
                            src={book.formats["image/jpeg"]}
                            alt={book.title}
                            whileHover={{ scale: 1.1 }} 
                            transition={{ type: "spring", stiffness: 300 }} 
                        />
                    </motion.div>

                    {/* Right column for book details */}
                    <motion.div
                        className="flex flex-col justify-center space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold">Title: {book.title}</h1>
                        <p className="text-xl">
                            Author(s): {book.authors.map((author) => author.name).join(", ")}
                        </p>
                        <p className="text-lg">
                            Birth Year: {book.authors.map((author) => author.birth_year).join(", ") || "N/A"}
                        </p>
                        <p className="text-lg">
                            Death Year: {book.authors.map((author) => author.death_year).join(", ") || "N/A"}
                        </p>
                        <p className="text-lg">
                            Genre: {book.subjects.length > 0 ? book.subjects.join(", ") : "N/A"}
                        </p>
                        <p className="text-lg">
                            Bookshelves: {book.bookshelves.length > 0 ? book.bookshelves.join(", ") : "N/A"}
                        </p>
                        <h5 className="text-md">Book ID: {book.id}</h5>
                        <p className="text-md">Download Count: {book.download_count}</p>

                        <div className="flex space-x-4 mt-8">
                            <Link to="/">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                                    Home
                                </button>
                            </Link>
                            <Link  to="/wishlist">

                                <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                                    Wishlist
                                </button>
                            </Link>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold">Available Formats:</h4>
                            <ul className="list-disc list-inside">
                                {Object.entries(book.formats).map(([format, url]) => (
                                    <li key={format}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {format}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BookDetails;
