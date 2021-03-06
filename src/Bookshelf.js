import React, { Component } from "react";

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'move' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const selectedIndex = event.target.options.selectedIndex;
    let itemId = event.target.options[selectedIndex].getAttribute('data-key');
    let newShelf = event.target.value;
    this.props.onAddItem(itemId, newShelf);
  }

  render() {
    /*
    Destructuring via ES6. We're getting the profiles, users, and movies properties
    off of the pros passed into this presentational component. If you need a
    refresher on this syntax, check out this course:
    https://www.udacity.com/course/es6-javascript-improved--ud356
    */
    const { curReading, title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {curReading.length > 0 ? (curReading.map((book) => {
              return (
                <li key={book.id.toString()}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail}})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.handleChange}>
                          <option key="1" data-key={book.id} value="move" disabled>Move to...</option>
                          <option key="2" data-key={book.id} value="currentlyReading">Currently Reading</option>
                          <option key="3" data-key={book.id} value="wantToRead">Want to Read</option>
                          <option key="4" data-key={book.id} value="read">Read</option>
                          <option key="5" data-key={book.id} value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title.toString()}</div>
                    {book.authors.map((author) => {
                      return (
                        <div key={"div" + author.toString()} className="book-authors">{author}</div>
                      )
                    })}
                  </div>
                </li>
              )
            })) : "you didn't add yet"}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
