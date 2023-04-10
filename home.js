import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "q",
      searchQuery: "",
      books: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchType, searchQuery } = this.state;
    const offset = 0; // starting offset
    const limit = 10; // number of results per page
    const searchUrl = `https://openlibrary.org/search.json?${searchType}=${searchQuery}`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const books = data.docs.map(book => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(", ") : "Unknown",
          publishDate: book.first_publish_year || "Unknown",
          key: book.key
        }));
        this.setState({ books });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search By:
            <select
              name="searchType"
              value={this.state.searchType}
              onChange={this.handleInputChange}
            >
              <option value="q">Title</option>
              <option value="author">Author</option>
            </select>
          </label>
          <input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map(book => (
              <tr key={book.key}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HOME;



