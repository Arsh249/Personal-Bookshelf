import React, { useState, useEffect } from 'react';
import '../App.scss';
import { toast } from 'react-toastify';


const PersonalBookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = localStorage.getItem('bookshelf');
    if (storedBookshelf) {
      setBookshelf(JSON.parse(storedBookshelf));
    }
  }, []);

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookKey);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    toast.success("Item removed from your bookshelf!" , {position: "top-center"});
  };

  return (
    <div className='personal-bookshelf-page'>
      <h1>My Bookshelf</h1>
      <div className='bookshelf'>
        {bookshelf.map((book) => (
          <div key={book.key} className='book-card'>
            {<><h3>Book Title:</h3> <p>{book.title}</p></>}
            {<><h3>Author Name:</h3><p>{book.author_name}</p></>}
            {<><h3>Published Year:</h3><p>{book.first_publish_year}</p></>}
            {<><h3>Edition Count:</h3><p>{book.edition_count}</p></>}
            <button onClick={() => removeFromBookshelf(book.key)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookshelfPage;
