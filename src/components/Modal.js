import React, { Component } from "react";
import config from "./../../config";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (!("movieDbService" in props)) {
      throw Error("movieDbService must be provided");
    }
  }

  async componentDidMount() {
    const movie = await this.props.movieDbService.getSingleMovie(
      this.props.selectedMovieId
    );
    this.setState({
      movie: movie
    });
  }

  hideModal = event => {
    if (
      event.target.className === "modal display-block" ||
      event.target.className === "close-modal-button"
    ) {
      this.props.handleHideModal();
    }
  };

  render() {
    return (
      <div onClick={this.hideModal} className="modal display-block">
        {this.state.movie ? (
          <div className="modal-main">
            <img className="large-poster" src={this.state.movie.imageUrl}></img>
            <h1>{this.state.movie.title}</h1>
            <h3>Air date: {this.state.movie.date}</h3>
            <h3>Rating: {this.state.movie.rating}</h3>
            <p>Description: {this.state.movie.description}</p>
            <button className="close-modal-button">close</button>
          </div>
        ) : (
          <div>Loading movie details...</div>
        )}
      </div>
    );
  }
}

export default Modal;
