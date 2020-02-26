import React, { Component } from "react";
import ReactDOM from "react-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      searchTerm: value
    });
  };

  searchMovies = event => {
    event.preventDefault();
    this.props.handleQueryChange(this.state.searchTerm);
  };

  render() {
    return (
      <div className="appBar">
        <p className="logo">WOVIEMEBVPP</p>
        <form onSubmit={this.searchMovies}>
          <input
            className="searchBox"
            type="text"
            name="searchBox"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <button
            onClick={() => this.props.handleQueryChange(this.state.searchTerm)}
            className="searchButton"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
export default Header;
