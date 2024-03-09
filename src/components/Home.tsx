import MovieList from "./MovieList";
import { useEffect } from "react";
import MovieApi from "../api/MovieApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { Movie, fetchContent } from "../features/movies/MovieSlice";

export interface HomeProps {}
const apiKey = process.env.REACT_APP_API_KEY;

const Home = (props: HomeProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const defaultSearchText = "Pokemon";
    const defaultSearchType = "";
    dispatch(
      fetchContent({
        searchText: defaultSearchText,
        searchType: defaultSearchType,
      })
    );
  }, []);

  return (
    <div>
      Home Page
      <MovieList />
    </div>
  );
};
export default Home;
