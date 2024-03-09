import MovieList from "./MovieList";
import { useEffect } from "react";
import MovieApi from "../api/MovieApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { Movie, fetchMovies, fetchTvSeries } from "../features/movies/MovieSlice";



export interface HomeProps {}
const apiKey = process.env.REACT_APP_API_KEY;

const Home = (props: HomeProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const MovieText = "Pokemon";
  useEffect(() => {
   dispatch(fetchMovies())
   dispatch(fetchTvSeries())
  }, []);

  return (
    <div>
      Home Page
      <MovieList />
    </div>
  );
};
export default Home;
