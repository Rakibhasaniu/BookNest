import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBooks from "../../hooks/useBooks";

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
    return <p>Loading book details...</p>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column for book image */}
          <div className="flex justify-center">
            <img
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
              alt={book.title}
            />
          </div>

          {/* Right column for book details */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold">Title: {book.title}</h1>
            <p className="text-xl">Author(s): {book.authors.map((author) => author.name).join(", ")}</p>
            <p className="text-lg">Genre: {book.subjects && book.subjects.length > 0 ? book.subjects[0] : "N/A"}</p>
            <h5 className="text-md">Book ID: {book.id}</h5>
            <p className="mt-4 text-base">Description: {book.description || "No description available."}</p>

            <div className="flex space-x-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                Buy Now
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
