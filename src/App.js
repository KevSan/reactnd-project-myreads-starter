import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import BookList from './BookList'
import SearchResults from "./SearchResults";

class BooksApp extends React.Component {
  state = {
    currentlyReadingList: [],
    wantToReadList: [],
    haveReadList: [],
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
          <SearchResults
            books={this.state.currentlyReadingList}
            update={() => this.updateBookShelf()}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
