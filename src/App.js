import React from 'react'
import Routes from './Routes'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // ESTANTE DO USUARIO
    books: [{}],
    // CATEGORIAS DE ESTANTES DO USUARIO
    shelves: [
      {
        name: "Currently Reading",
        value: "currentlyReading"
      },
      {
        name: "Want To Read",
        value: "wantToRead"
      },
      {
        name: "Read",
        value: "read"
      }
    ],
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
      .then((res) => {
        this.getBooks()
        this.searchBook(this.state.query)
      })
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
        .then(search => {
          // ATUALIZA AS ESTANTES DOS LIVROS JA SELECIONADOS PELO USUARIO
          search.map(s => (
            this.state.books.map(b => {
              s.id === b.id && (
                s.shelf = b.shelf
              )
              s.shelf === undefined && (
                s.shelf = "none"
              )
              return search
            })
          ))
          this.setState({
            booksSearched: search
          })
        })
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
        <Routes
          shelves={this.state.shelves}
          books={this.state.books}
          updateShelf={this.updateShelf}
          query={this.state.query}
          booksSearched={this.state.booksSearched}
          searchBook={this.searchBook}
        />
      </div>
    )
  }
}

export default BooksApp
