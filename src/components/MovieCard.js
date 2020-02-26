import React, { Component } from "react";
import ReactDOM from "react-dom";

class MovieCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="movie-card"
        onClick={() => this.props.handleItemClicked(this.props.id)}
      >
        <img className="movie-image" src={this.props.imageUrl} />
        <h1>{this.props.title} </h1>
        <p>{this.props.year}</p>
      </div>
    );
  }
}
export default MovieCard;
