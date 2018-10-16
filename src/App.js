import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // ESTANTE DO USUARIO
    books: [{}],
    // CATEGORIAS DE ESTANTES DO USUARIO
    shelfs: ["currentlyReading", "wantToRead", "read"],
    // QUERY DE PESQUISA
    query: "",
    // ESTANTE DE PESQUISA
    booksSearched: [{}]
  }

  // FAZ UMA REQUISIÇAO INICIAL DOS LIVROS DO USUARIO
  componentDidMount() {
    this.getBooks()
  }

  // REQUISITA TODOS OS LIVROS DO USUARIO
  getBooks = () => (
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: books
        })
      })
      .catch(error => console.log(error))
  )

  // ATUALIZA A ESTANTE DO LIVRO DE ACORDO COM A OPÇAO SELECIONADA
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => (
        this.getBooks()
      ))
      .catch(error => console.log(error))
  }

  // PESQUISA POR UM LIVRO NA API
  searchBook = (query) => {
    this.setState({
      query: query
    })

    // VERIFICA SE O INPUT ESTA VAZIO ANTES DE EFETUAR A REQUISIÇAO
    if (query !== "") {
      BooksAPI.search(query)
        .then(search => (
          this.setState({
            booksSearched: search
          })
        ))
    } else {
      // SE A QUERY ESTIVER VAZIA, LIMPA A ESTANTE DE PESQUISA
      this.setState({
        booksSearched: [{}]
      })
    }

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* TRANSFORMA O INPUT EM UM COMPONENTE CONTROLADO E CHAMA A FUNÇAO DE PESQUISA AO ALTERAR O VALOR DO CAMPO */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.searchBook(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* VERIFICA SE EXISTE LIVROS NA ESTANTE DE PESQUISA E CASO POSITIVO PROSSEGUE COM O MAPEAMENTO */}
                {this.state.booksSearched.length > 1 && (
                  // MAPEIA A ESTANTE DE PESQUISA E EXIBE OS LIVROS E SEUS DADOS
                  this.state.booksSearched.map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => this.updateShelf(book, event.target.value)}
                              value={book.shelf}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {/* VERIFICA SE A INFORMAÇAO DO AUTHOR ESTA DISPONIVEL ANTES DE MAPEAR */}
                        <div className="book-authors">
                          {book.authors !== undefined && (
                            book.authors.map((author, i) => (
                              <span key={i}>{author}</span>
                            ))
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {/* MAPEIA AS ESTANTES CADASTRADAS E EM SEGUIDA DISTRIBUI O LIVRO NA ESTANTE CORRESPONDENTE */}
                  {this.state.shelfs.map(shelf => (
                    <div key={shelf} className="bookshelf">
                      <h2 className="bookshelf-title">
                        {/* COMPARA O NOME DA ESTANTE E CORRIGE A ESCRITA PARA EXIBIR CORRETAMENTE */}
                        {shelf === "currentlyReading" && ("Currently Reading")}
                        {shelf === "wantToRead" && ("Want To Read")}
                        {shelf === "read" && ("Read")}
                      </h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        {/* MAPEIA OS LIVROS DO USUARIO E DISTRUBUI NA ESTANTE CORRESPONDENTE */}
                          {this.state.books.map(book => (
                            book.shelf === shelf && (
                              <li key={book.id}>
                                <div className="book">
                                  <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                    <div className="book-shelf-changer">
                                      <select onChange={(event) => this.updateShelf(book, event.target.value)}
                                        value={book.shelf}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="book-title">{book.title}</div>
                                  {/* VERIFICA SE AUTHOR EXISTE ANTES DE MAPEAR */}
                                  <div className="book-authors">
                                    {book.authors !== undefined && (
                                      book.authors.map((author, i) => (
                                        <span key={i}>{author}</span>
                                      ))
                                    )}
                                  </div>
                                </div>
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
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
