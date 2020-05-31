import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component{

  state = {
    bookList: []
  }

  componentDidUpdate(prevProps) {
    if (this.props.listOfBooks !== prevProps.listOfBooks) {
      this.setState(() => ({
        bookList: this.props.listOfBooks
      }))
    }
  }


  render() {
    return(
      <div className="bookShelf">
        <h2 className="bookshelf-title">
          {this.props.shelf}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.bookList.map((book) =>(
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={this.props.shelf}
                  update={this.props.update}
                />
                {console.log("Booklist func: ", this.props.update)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookList