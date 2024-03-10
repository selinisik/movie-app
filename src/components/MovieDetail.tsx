import { useEffect } from "react";
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

  const checkNA = (text: string | undefined) => {
    return text === "N/A" ? "Not Available" : text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-sky-900 to-zinc-950 text-white p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="bg-gray-900 p-4 sm:p-12 rounded-lg shadow-lg border">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            {movie.Title} ({checkNA(movie.Year)})
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
              <strong>Rated:</strong> {checkNA(movie.Rated)}
            </span>
            <span>
              <strong>Runtime:</strong> {checkNA(movie.Runtime)}
            </span>

            <span>
              <strong>Release Date:</strong> {checkNA(movie.Released)}
            </span>
          </div>
          <div className="flex items-center mb-4 gap-4">
            <span>IMDB: {checkNA(movie.imdbRating)}</span>
            {movie.Ratings &&
              movie.Ratings.map((rating, index) => (
                <div key={index} className="flex items-center">
                  <span>
                    {rating.Source}: {rating.Value}
                  </span>
                </div>
              ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 flex justify-center md:justify-start items-center">
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-4/5 h-full object-cover rounded-md"
                />
              ) : (
                <p>No poster available</p>
              )}
            </div>
            <div className="md:flex-1 md:ml-8">
              <p className="mb-4">
                <strong>Plot:</strong> {checkNA(movie.Plot)}
              </p>
              <p className="mb-4">
                <strong>Director:</strong> {checkNA(movie.Director)}
              </p>
              <p className="mb-4">
                <strong>Writers:</strong> {checkNA(movie.Writer)}
              </p>
              <p className="mb-4">
                <strong>Actors:</strong> {checkNA(movie.Actors)}
              </p>
              <p className="mb-4">
                <strong>Language:</strong> {checkNA(movie.Language)}
              </p>
              <p className="mb-4">
                <strong>Country:</strong> {checkNA(movie.Country)}
              </p>
              <p className="mb-4">
                <strong>Awards:</strong> {checkNA(movie.Awards)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
