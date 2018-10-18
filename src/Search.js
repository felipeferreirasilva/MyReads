import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

const Search = props => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/* TRANSFORMA O INPUT EM UM COMPONENTE CONTROLADO E CHAMA A FUNÇAO DE PESQUISA AO ALTERAR O VALOR DO CAMPO */}
                    <input type="text" placeholder="Search by title or author" value={props.query} onChange={(event) => props.searchBook(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {/* VERIFICA SE EXISTE LIVROS NA ESTANTE DE PESQUISA E CASO POSITIVO PROSSEGUE COM O MAPEAMENTO */}
                    {props.booksSearched.length > 1 && (
                        // MAPEIA A ESTANTE DE PESQUISA E EXIBE OS LIVROS E SEUS DADOS
                        props.booksSearched.map(book => (
                            <li key={book.id}>
                                <Book book={book} updateShelf={props.updateShelf} />
                            </li>
                        ))
                    )}
                </ol>
            </div>
        </div>
    )
}

export default Search