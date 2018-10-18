import React from 'react'

const Book = props => {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.book.imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => props.updateShelf(props.book, event.target.value)}
                        value={props.book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            {/* VERIFICA SE AUTHOR EXISTE ANTES DE MAPEAR */}
            <div className="book-authors">
                {props.book.authors !== undefined && (
                    props.book.authors.map((author, i) => (
                        <span key={i}>{author}</span>
                    ))
                )}
            </div>
        </div>
    )
}

export default Book