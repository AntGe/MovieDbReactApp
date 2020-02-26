import React, { Component } from "react";
import MovieCard from "./MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

class MovieCardList extends Component {
  constructor(props) {
    super(props);
  }

  handleItemClicked = itemId => {
    this.props.handleItemClicked(itemId);
  };

  render() {
    return this.props.movies.length > 0 ? (
      <div className="movie-list">
        <InfiniteScroll
          dataLength={this.props.movies.length}
          next={this.props.fetchMoreData}
          hasMore={this.props.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more movies. Finito.</b>
            </p>
          }
        >
          {this.props.movies.map((item, index) => (
            <MovieCard
              key={index}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              year={item.year}
              handleItemClicked={this.handleItemClicked}
            />
          ))}
        </InfiniteScroll>
      </div>
    ) : (
      <div>No movies :c</div>
    );
  }
}
export default MovieCardList;
