import React from 'react';
import { NavLink } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf';
import WithAllBooks from './WithAllBooks';

class Search extends React.Component {
    state = {
        query: '',
        result: [],
        loading: false
    }

    updateQuery = async (value) => { 
        if(value) {
            this.setState({ loading: true });
            BooksAPI.search(value).then((result) => {
                /* Isso aqui ficou mt ruim! Antes no método search a API estava retornando 
                os shelfs e eu já estava mostrando pro usuário em qual estante o seu livro estava adicionado */
               const resultsWithShelf = result.map((bookResult) => {
                   this.props.books.map((book) => {
                        if (book.id === bookResult.id) {
                            bookResult.shelf = book.shelf;
                        }
                   })
                   return bookResult;
               })
                this.setState({ result: resultsWithShelf, loading: false })
            }).catch((error) => {
                this.setState({ result: [], loading: false })
            })
        } else {
            this.setState({ result: [], loading: false })
        }
    }

    onUpdate = () => {
        if (confirm("Livro adicionado com sucesso, deseja ser redirecionado para a página principal?")) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <NavLink className="close-search" to="/">Close</NavLink>
                    <div className="search-books-input-wrapper">
                        <input onChange={(event) => this.updateQuery(event.target.value)}type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksShelf books={this.state.result} loading={this.state.loading} onUpdate={this.onUpdate}/>
                </div>
            </div>
        ) 
    }
}

export default WithAllBooks(Search);
