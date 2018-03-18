import React from 'react';
import { NavLink } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf';

class Search extends React.Component {
    state = {
        query: '',
        result: [],
        loading: false
    }

    updateQuery = async (e) => {
        this.setState({ loading: true });
        BooksAPI.search(e).then((result) => {
            console.log(result);
            this.setState({ result, loading: false })
        })
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

export default Search
