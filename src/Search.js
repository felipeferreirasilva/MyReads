import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle';

const Search = props => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/* UTILIZA O DEBOUNCE PARA NAO ENVIAR VARIAS REQUISIÇÓES SEGUIDAS A API E CHAMA A FUNÇAO DE PESQUISA AO ALTERAR O VALOR DO CAMPO */}
                    <Debounce time="500" handler="onChange">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => props.searchBook(event.target.value)} />
                    </Debounce>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {/* VERIFICA SE EXISTE LIVROS NA ESTANTE DE PESQUISA E CASO POSITIVO PROSSEGUE COM O MAPEAMENTO */}
                    {props.booksSearched.length > 1 && (
                        // MAPEIA A ESTANTE DE PESQUISA E EXIBE OS LIVROS E SEUS DADOS
                        props.booksSearched.map(book => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateShelf={props.updateShelf}
                                    booksSearched={props.booksSearched} />
                            </li>
                        ))
                    )}
                </ol>
            </div>
        </div >
    )
}

export default Search