import React, { useState } from 'react';
import '../App.scss';
import { toast } from 'react-toastify';


const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
        setLoading(true); 
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResults(data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

  const addToBookshelf = (book) => {
    const existingBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!existingBookshelf.some((b) => b.key === book.key)) {
      const updatedBookshelf = [...existingBookshelf, book];
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
      toast.success("Book added to your bookshelf!" , {position: "top-center"});
    } else {
      toast.error("This book is already in your bookshelf.", {position: "top-center"});
    }
  };

  return (
    <div className='book-search-page'>
        <h1>Search by Book Name:</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
      />
      <button className='searchbtn' onClick={handleSearch}>Search</button>
      {loading && <div className="loading-bar" />}
      <div className='search-results'>
        {results.map((book) => (
          <div key={book.key} className='book-card'>
           <div className='details'>
           {<><h3>Book Title:</h3> <p>{book.title}</p></>}
            {<><h3>Author Name:</h3><p>{book.author_name}</p></>}
            {<><h3>Published Year:</h3><p>{book.first_publish_year}</p></>}
            {<><h3>Edition Count:</h3><p>{book.edition_count}</p></>}
           </div>
           <div className='addBtn'><button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button></div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
