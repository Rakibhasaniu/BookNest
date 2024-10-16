import useBooks from "../../hooks/useBooks";

const Home = () => {
    const [books] = useBooks();
    console.log(books.results)
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>

            {/* Check if books exist */}
            {books && books.results ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.results.map((book) => (
                        <div key={book.id} className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300">
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
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Loading books...</p>
            )}
        </div>
    );
};

export default Home;
