import React, { Component } from 'react'
import * as BooksApi from './BooksAPI'

class CategoryDropMenu extends Component{

  state = {
    value: "none"
  }

  shelfMapping = {
    'Currently Reading': 'currentlyReadingList',
    'Want to Read': 'wantToReadList',
    'Have Read': 'haveReadList'
  }

  componentDidMount(){
    if(this.props.book.shelf !== undefined) {
      this.setState(() => ({
        value: this.props.book.shelf
      }))
    }
  }

  handleOnChange(event, book){
    this.setState({value: event.target.value})
    this.moveBook(event, book)
  }

  moveBook(event, book){
    const res = BooksApi.update(book, event.target.value)
    BooksApi.getAll().then((allBooks) => {
      console.log("Is there an update: ", allBooks)
    })
    this.props.update()
  }

  render(){
    return(
      <div className="book-shelf-changer">
        <select
          value={this.state.value}
          onChange={(event) => this.handleOnChange(event, this.props.book)}
        >
          {console.log("test: ", this.state)}
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default CategoryDropMenu