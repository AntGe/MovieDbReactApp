import config from "../../config";

export default class MovieDbService {
  constructor() {
    this.baseImageUrl = undefined;
    this.largeImageUrl = undefined;
  }

  getConfig = async () => {
    await fetch(`${config.configurationUrl}`)
      .then(result => result.json())
      .then(jsonResponse => {
        (this.baseImageUrl = `${jsonResponse.images.base_url}${jsonResponse.images.poster_sizes[2]}/`),
          (this.largeImageUrl = `${jsonResponse.images.base_url}${jsonResponse.images.poster_sizes[3]}/`);
      });
  };

  searchMovies = async (query, page) => {
    if (!this.baseImageUrl || !this.largeImageUrl) {
      await this.getConfig();
    }
    return await fetch(
      `${config.backendUrl}/search/movie?query=${
        query ? query : config.defaultSearchQuery
      }&page=${page ? page : 1}&api_key=${config.apiKey}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        let movies = jsonResponse.results.map(movie => {
          return {
            id: movie.id,
            imageUrl: movie.poster_path
              ? `${this.baseImageUrl}${movie.poster_path}`
              : config.placeholderImageUrl,
            title: movie.original_title,
            year: movie.release_date
          };
        });
        return movies;
      });
  };

  getSingleMovie = async movieId => {
    if (!this.baseImageUrl || !this.largeImageUrl) {
      await this.getConfig();
    }
    return fetch(
      `${config.backendUrl}/movie/${movieId}?api_key=${config.apiKey}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        return {
          imageUrl: jsonResponse.poster_path
            ? `${this.largeImageUrl}${jsonResponse.poster_path}`
            : config.placeholderImageUrl,
          title: jsonResponse.original_title,
          rating: jsonResponse.vote_average,
          date: jsonResponse.release_date,
          description: jsonResponse.overview
        };
      });
  };
}
