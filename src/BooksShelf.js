import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksShelf extends React.Component {
    updateShelf(e, shelf) {
        BooksAPI.update(shelf, e.target.value).then((result) => {
           this.props.onUpdate();
        });
    }

    render() {
        const {books, title, loading} = this.props;
        return (
            <div className="bookshelf">
                {title && (   
                    <h2 className="bookshelf-title">{title}</h2>
                )}
                {console.log(this.props.books)}
                
                {!loading ? (
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail : "http://via.placeholder.com/128x193"})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select 
                                                    onChange={(e) =>this.updateShelf(e, book)} 
                                                    defaultValue={typeof book.shelf === "undefined" ? "none" : book.shelf}
                                                >
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div> 
                ): (
                    <div className="loading"><div></div><div></div><div></div><div></div></div>
                )}
            </div>
        )
    }
}

export default BooksShelf
