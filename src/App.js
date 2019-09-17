import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI.js';
import Bookshelf from "./Bookshelf";
import Booktemplate from "./Booktemplate";
import { Link, Route } from 'react-router-dom'

const pageTitleList = ["Currently Reading", "Want to Read", "Read"]

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookshelflist: [],
      showSearchPage: false,
      searchTextValue: '',
      allBooks: [],
      addedId: '',
      addedCategory: ''
    };

    this.refreshBookShelfList();


    if (this.state.searchTextValue.length > 1)
      BooksAPI.search(this.state.searchTextValue).then((books) => {
        this.setState({
          allBooks: books
        })

      });

  }

  componentDidMount(){
    
  }

  refreshBookShelfList() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        bookshelflist: books
      });
    });
  }

  refreshSearchList() {
    if (this.state.searchTextValue.length > 1) {
      BooksAPI.search(this.state.searchTextValue).then((books) => {
        this.setState({ allBooks: books })
      });
    } else {
      this.setState({ allBooks: [] })
    }
  }

  handleChange = event => {
    this.setState({ searchTextValue: event.target.value });
    this.refreshSearchList()
  };

  handleAddItem = (itemId, newShelf) => {

    BooksAPI.get(itemId).then((book) => {
      BooksAPI.update(book, newShelf).then(() => {
        this.refreshBookShelfList();
        this.refreshSearchList()
      })
    });

  };


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
                <input type="text" value={this.state.searchTextValue} onChange={this.handleChange} placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.allBooks && this.state.allBooks.length > 0 ? (this.state.allBooks.map((book, index) => {
                    return (
                      <Booktemplate key={index} book={book} onAddItem={this.handleAddItem} />
                    )
                  })) : "the record did not find with that text"
                }
              </ol>
            </div>
          </div>
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf key="bookshelf1" onAddItem={this.handleAddItem} curReading={this.state.bookshelflist.filter((x) => x.shelf === "currentlyReading")} title={pageTitleList[0]} />
                <Bookshelf key="bookshelf2" onAddItem={this.handleAddItem} curReading={this.state.bookshelflist.filter((x) => x.shelf === "wantToRead")} title={pageTitleList[1]} />
                <Bookshelf key="bookshelf3" onAddItem={this.handleAddItem} curReading={this.state.bookshelflist.filter((x) => x.shelf === "read")} title={pageTitleList[2]} />
              </div>
            </div>
            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )} />


      </div>
    )
  }
}

export default BooksApp
