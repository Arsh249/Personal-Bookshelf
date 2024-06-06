import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import PersonalBookshelfPage from './components/PersonalBookshelfPage';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Book Search</Link>
            </li>
            <li>
              <Link to="/bookshelf">My Bookshelf</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<PersonalBookshelfPage />} />
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
  );
};

export default App;