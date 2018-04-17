import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI'


const WithAllBooks = (WrappedComponent) => {
    return class extends Component {
        state = {
            books: [],
        }

        componentDidMount() {
            this.getBooks();
        }

        getBooks = () => {
            BooksAPI.getAll().then((books) => {
                console.log("livros", books)
                this.setState({ books })
            })
        }

        render() {
            return (
                <div>
                    <WrappedComponent books={this.state.books} {...this.props} />
                </div>
            )
        }
    }
};

export default WithAllBooks;