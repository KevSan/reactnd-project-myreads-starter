import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Router, Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    searchList: [],
    currentList: [],
    wantToReadList: [],
    haveReadList: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <div>
            <div>Hi</div>
            <div className="open-search">
              <Link to='/search'>
                <button>Add a book
                </button>
              </Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <Link
            to='/search'
          >
           <div className="search-books">
             <div className="search-books-bar">
               <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
               <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
               </div>
             </div>
             <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
           </div>
          </Link>
        )}/>

      </div>
    )
  }
}

export default BooksApp
