import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

const UserBooks = props => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {/* MAPEIA AS ESTANTES E EM SEGUIDA DISTRIBUI O LIVRO NA ESTANTE CORRESPONDENTE */}
                    {props.shelves.map(shelf => (
                        <div key={shelf.name} className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.name}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {/* MAPEIA OS LIVROS DO USUARIO E DISTRUBUI NA ESTANTE CORRESPONDENTE */}
                                    {props.books.map(book => (
                                        book.shelf === shelf.value && (
                                            <li key={book.id}>
                                                <Book
                                                    book={book}
                                                    updateShelf={props.updateShelf} />
                                            </li>
                                        )
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default UserBooks