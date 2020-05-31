import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    query: "",
    currentlyReadingList: [],
    wantToReadList: [],
    haveReadList: [],
    searchResults: []
  }

  componentDidMount() {
    this.updateBookShelf()
  }

  updateBookShelf() {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          currentlyReadingList: allBooks.filter((book) =>(
            book.shelf.includes("currentlyReading")
          )),
          wantToReadList: allBooks.filter((book) =>(
            book.shelf.includes("wantToRead")
          )),
          haveReadList: allBooks.filter((book) =>(
            book.shelf.includes("read")
          ))
        }))
      })
  }

    updateSearchResults = (query) => {
    this.updateQuery(query)
    BooksAPI.search(query)
      .then((books) => {
        console.log("Books: ", books)
        console.log("Bool check: ", Array.isArray(books))

        if(Array.isArray(books)) {
          this.setState(() => ({
            searchResults: books
          }))
        }else {
          this.setState(() => ({
            searchResults: []
          }))
        }
      })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookList
              shelf='Currently Reading'
              listOfBooks={this.state.currentlyReadingList}
              update={() => this.updateBookShelf()}
            />
            {console.log("App list: ", this.state)}
            <BookList
              shelf='Want to Read'
              listOfBooks={this.state.wantToReadList}
              update={() => this.updateBookShelf()}
            />

            <BookList
              shelf='Have Read'
              listOfBooks={this.state.haveReadList}
              update={() => this.updateBookShelf()}
            />

            <div className="open-search">
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <div>
            <BookList
              category='Currently Reading'
              listOfBooks={this.state.searchResults}
              update={() => this.updateBookShelf()}
            />
            <Link to='/search'>
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to='/'>
                    {
                      //TODO fix hover on button
                    }
                    <button
                      className="close-search"
                      onClick={() => this.updateBookShelf()}
                    >Close</button>
                  </Link>

                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={(event) => this.updateSearchResults(event.target.value)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
            </Link>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
