import { getAllData } from "../features/movies/MovieSlice";
import * as React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export interface MovieListProps {}

const MovieList = (props: MovieListProps) => {
  const data = useSelector(getAllData);
  const renderMovies =
    data.ResponseMovies === "True" ? (
      data.movies.map((movie, index) => {
        return <MovieCard data={movie} key={index} />;
      })
    ) : (
      <p>Error</p>
    );
  const renderTvSeries =
    data.ResponseTvSeries === "True" ? (
      data.tvSeries.map((tvSeries, index) => {
        return <MovieCard data={tvSeries} key={index} />;
      })
    ) : (
      <p>Error</p>
    );
  return (
    <div className="mx-4 md:mx-10 text-white">
      <p> Movie List</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {renderMovies}
      </div>

      <p> Tv Series List</p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {renderTvSeries}
      </div>
    </div>
  );
};
export default MovieList;
