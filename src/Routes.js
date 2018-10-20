import React from 'react'
import UserBooks from './UserBooks'
import Search from './Search'
import { Route } from 'react-router-dom'

const Routes = props => {
    return (
        <div>
            <Route path="/" exact render={() => <UserBooks
                shelfs={props.shelfs}
                books={props.books}
                updateShelf={props.updateShelf}
            />} />

            <Route path="/search" render={() => <Search
                query={props.query}
                updateShelf={props.updateShelf}
                booksSearched={props.booksSearched}
                searchBook={props.searchBook}
            />} />
        </div>
    )
}

export default Routes