import MovieList from "./MovieList";
import { useEffect } from "react";
import MovieApi from "../api/MovieApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { Movie, addMovies } from "../features/movies/MovieSlice";

export interface FetchMovies {
  Response: string;
  Search: Movie[];
  totalResults: string;
}

export interface HomeProps {}
const apiKey = process.env.REACT_APP_API_KEY;

const Home = (props: HomeProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const MovieText = "Pokemon";
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await MovieApi.get<FetchMovies>(
          `?apiKey=${apiKey}&s=${MovieText}&type=movie`
        );
        if (response.data.Response === "True" && response.data.Search) {
          dispatch(
            addMovies({
              Search: response.data.Search,
              totalResults: parseInt(response.data.totalResults),
            })
          );
        } else {
          console.error("No movies found or API error");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, MovieText]);

  return (
    <div>
      Home Page
      <MovieList />
    </div>
  );
};
export default Home;
