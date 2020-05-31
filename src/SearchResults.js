import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import {Link} from "react-router-dom";

class SearchResults extends Component{

  state = {
    query: "",
    searchResults: []
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

    const { query } = this.state

    return(
      <div>
        <BookList
          category='Currently Reading'
          listOfBooks={this.state.searchResults}
          update={this.props.update}
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
                  onClick={this.props.update}
                >Close</button>
              </Link>

              <div className="search-books-input-wrapper">
                {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
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
    )
  }
}

export default SearchResults