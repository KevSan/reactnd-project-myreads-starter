import React, { Component } from 'react'
import CategoryDropMenu from './CategoryDropMenu'

class Book extends Component{
  render() {
    return(
      <div className="book">
        <div className="book-top">
          {this.props.book.imageLinks !== undefined && (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.book['imageLinks']['smallThumbnail']})`
              }}>
            </div>)
            }
          <CategoryDropMenu
            book={this.props.book}
            shelf={this.props.shelf}
            update={this.props.update}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors !== undefined &&(
          <div>
            {
              this.props.book.authors.map((author) => (
                <div
                  className="book-authors"
                  key={author}>
                  {author}
                </div>
              ))}
          </div>
        )}
      </div>
    )
  }
}

export default Book