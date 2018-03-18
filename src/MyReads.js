import React from 'react';
import { NavLink } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf';
import Search from './Search';

class MyReads extends React.Component {
    state = {
        books: [],
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    render() {
        const { books } = this.state;
        const currentlyReading = books.filter(currently => currently.shelf === "currentlyReading");
        const wantToRead = books.filter(want => want.shelf === "wantToRead");
        const read = books.filter(read => read.shelf === "read");

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BooksShelf books={currentlyReading} title="Currently Reading" loading={currentlyReading.length === 0} onUpdate={this.getBooks} />
                        <BooksShelf books={wantToRead} title="Want To Read" loading={wantToRead.length === 0} onUpdate={this.getBooks} />
                        <BooksShelf books={read} title="Read" loading={read.length === 0} onUpdate={this.getBooks} /> 
                    </div>
                </div>
                <div className="open-search">
                    <NavLink
                        to="/search"
                    >Add a book</NavLink>
                </div>
            </div>
        )
    }
}

export default MyReads
