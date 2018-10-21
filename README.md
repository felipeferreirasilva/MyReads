# MyReads Project

MyReads is a project that creates virtual shelves of books based on an API, so you can follow your actual and future readings.

# Install and Run

This project was created using React framework, to run it locally you will need to download NodeJs from https://nodejs.org. After download Node, download the project MyReads, extract, access directory where your project is located, run the command "npm install" to download all modules and after that run the command "npm start" to start the project.

# Author

This project was created by Felipe Silva (felipeferreirasilva@gmail.com).

# Contributing

You can download, modify, and use this project whenever you want. I will not accept pull requests.

## Backend Server

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
