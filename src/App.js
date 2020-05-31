import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom';
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    query: "",
    allBooks: [],
    allBooksIds: {},
    searchResults: []
  }

  componentDidMount = () => {
    this.updateBookShelf()
  }

  arrayToObject = (array) =>
    array.reduce((obj, item) => {
      obj[item.id] = item.id
      return obj
    }, {})

  updateBookShelf = () => {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          allBooks: allBooks,
          allBooksIds: this.arrayToObject(allBooks)
        }))
      })
  }

  updateSearchResults = (query) => {
    this.updateQuery(query)
    BooksAPI.search(query)
      .then((searchResults) => {
        if(Array.isArray(searchResults)) {
          const updatedResults = searchResults.map((currBook) =>{
            if(currBook.id in this.state.allBooksIds){
              const shelvedBook = this.state.allBooks.filter((book) => (
                book.id.includes(currBook.id)
              ))
              currBook['shelf'] = shelvedBook[0]['shelf']
            }
            return currBook
          })
          this.setState(() => ({
            searchResults: updatedResults
          }))
        }else {
          this.setState(() => ({
            searchResults: []
          }))
        }
      })
  }

  filterBooksByShelf = (shelf) => {
    return this.state.allBooks.filter((book) => (
      book.shelf.includes(shelf)
    ))
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }))
  }

  clearQuery = () => {
    this.setState(() => ({
      query: '',
    }))
  }

  goBackToHomePage = () =>{
    this.clearQuery()
    this.updateBookShelf()
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
              listOfBooks={this.filterBooksByShelf("currentlyReading")}
              update={() => this.updateBookShelf()}
            />
            <BookList
              shelf='Want to Read'
              listOfBooks={this.filterBooksByShelf("wantToRead")}
              update={() => this.updateBookShelf()}
            />

            <BookList
              shelf='Have Read'
              listOfBooks={this.filterBooksByShelf("read")}
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
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/'>
                  <button
                    className="close-search"
                    onClick={() => this.goBackToHomePage()}
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
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
