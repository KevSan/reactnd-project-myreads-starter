import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component{
  render() {
    return(
      <div className="bookShelf">
        <h2 className="bookshelf-title">
          {this.props.category}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {//TODO add book component
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookList