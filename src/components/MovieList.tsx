import { getAllMovies } from "../features/movies/MovieSlice";
import * as React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export interface MovieListProps {}

const MovieList = (props: MovieListProps) => {
  const movies = useSelector(getAllMovies);
  const renderMovies =
    movies.Response === "True" ? (
      movies.movies.map((movie, index) => {
        return <MovieCard movie={movie} key={index} />;
      })
    ) : (
      <p>Error</p>
    );
  return (
    <div className="mx-4 md:mx-10">
      <p> Movie List</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{renderMovies}</div>
    </div>
  );
};
export default MovieList;
