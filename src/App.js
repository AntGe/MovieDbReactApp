import React, { Component } from "react";
import Header from "./components/Header";
import MovieCardList from "./components/MovieCardList";
import Modal from "./components/Modal";
import MovieDbService from "./services/MovieDbService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      showModal: false,
      selectedMovieId: "",
      currentPage: 1,
      searchQuery: "",
      hasMoreMovies: true
    };
    this.movieDbService = new MovieDbService();
  }

  async componentDidMount() {
    const movies = await this.movieDbService.searchMovies();
    this.setState({
      hasMoreMovies: !(movies.length < 20),
      movies: movies
    });
  }

  handleMovieSelection = movieId => {
    this.setState(
      {
        selectedMovieId: movieId
      },
      this.toggleModal()
    );
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  handleQueryChange = async searchQuery => {
    const movies = await this.movieDbService.searchMovies(searchQuery);
    this.setState({
      searchQuery: searchQuery,
      currentPage: 1,
      hasMoreMovies: !(movies.length < 20),
      movies: movies
    });
  };

  nextMoviesPage = () => {
    this.setState(
      prevState => {
        return {
          currentPage: prevState.currentPage + 1
        };
      },
      async () => {
        const newMovies = await this.movieDbService.searchMovies(
          this.state.searchQuery,
          this.state.currentPage
        );
        this.setState(prevState => {
          return {
            hasMoreMovies: !(newMovies.length < 20),
            movies: prevState.movies.concat(newMovies)
          };
        });
      }
    );
  };

  render() {
    return (
      <div className="page">
        <Header handleQueryChange={this.handleQueryChange} />
        {this.state.showModal && (
          <Modal
            movieDbService={this.movieDbService}
            selectedMovieId={this.state.selectedMovieId}
            handleHideModal={this.toggleModal}
          />
        )}
        <MovieCardList
          fetchMoreData={this.nextMoviesPage}
          movies={this.state.movies}
          handleItemClicked={this.handleMovieSelection}
          hasMore={this.state.hasMoreMovies}
        />
      </div>
    );
  }
}

export default App;
