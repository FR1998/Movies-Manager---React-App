import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery:"",
    selectedGenre:null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const {data:movies} = await getMovies();
    this.setState({ movies, genres: genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //componentDidMount() {
  // this.setState({ movies: getMovies() });
  //}

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
      toast.error('This movie has already been deleted!');

      this.setState({ movies: originalMovies });
    }
    
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery:"", currentPage: 1 });
  };

  handleSearch = query =>
  {
    this.setState({searchQuery:query, selectedGenre: null, currentPage:1})

  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if(searchQuery)
    filtered = allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if  (selectedGenre && selectedGenre._id)
      filtered =  allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { totalCount, data: movies } = this.getPagedData();
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no movies in DB</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary" style={{margin:20}} >New Movie</Link>
          {" "}
          <p>Showing {totalCount} movies in DB</p>
          <SearchBox onChange={this.handleSearch} value={searchQuery}/>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
