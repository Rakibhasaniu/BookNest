import { useEffect, useState } from "react";

const useBooks = () => {

    const [books, setBooks] = useState([]);
    const [loading,setLoading] = useState(true)
    console.log(books)

    useEffect(() => {
        fetch('https://gutendex.com/books')
            .then(res => res.json())
            .then(data => {
                
                setBooks(data)
                setLoading(false)
            })
    }, [])
    return [books,loading]
};

export default useBooks;