import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDetails,
  removeSelectedDetails,
} from "../features/movies/MovieSlice";
import { getAllData } from "../features/movies/MovieSlice";
import { AppDispatch } from "@/src/app/store";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getAllData);
  const movie = data.selectedDetails;

  useEffect(() => {
    if (id) {
      dispatch(fetchDetails(id));
    }
    return () => {
      dispatch(removeSelectedDetails());
    };
  }, [id, dispatch]);

  if (!movie || !movie.Title) {
    return (
      <div className="text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const parseGenres = (genreString: string | undefined) => {
    return (genreString ? genreString : "")
      .split(",")
      .map((genre: string) => genre.trim());
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="bg-gray-900 p-4 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            {movie.Title} ({movie.Year})
          </h1>

          <div className="flex flex-row gap-4 mb-6">
            {parseGenres(movie.Genre).map((genre, index) => (
              <div className="flex items-center rounded-full border p-2 px-6">
                <span key={index} className="text-lg">
                  {genre}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap mb-6 gap-5">
            <span>
              <strong>Rated:</strong> {movie.Rated}
            </span>
            <span>
              <strong>Runtime:</strong> {movie.Runtime}
            </span>

            <span>
              <strong>Release Date:</strong> {movie.Released}
            </span>
          </div>
          <div className="flex items-center mb-4 gap-4">
            <span>IMDB: {movie.imdbRating}</span>
            {movie.Ratings &&
              movie.Ratings.map((rating, index) => (
                <div key={index} className="flex items-center">
                  <span>
                    {rating.Source}: {rating.Value}
                  </span>
                </div>
              ))}
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 flex justify-start items-center">
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : <p>No poster available</p>}
            </div>
            <div className="md:flex-1 md:ml-8">
              <p className="mb-4">
                <strong>Plot:</strong> {movie.Plot}
              </p>
              <p className="mb-4">
                <strong>Director:</strong> {movie.Director}
              </p>
              <p className="mb-4">
                <strong>Writers:</strong> {movie.Writer}
              </p>
              <p className="mb-4">
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p className="mb-4">
                <strong>Language:</strong> {movie.Language}
              </p>
              <p className="mb-4">
                <strong>Country:</strong> {movie.Country}
              </p>
              <p className="mb-4">
                <strong>Awards:</strong> {movie.Awards}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
