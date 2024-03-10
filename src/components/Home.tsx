import MovieList from "./MovieList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchContent, getAllData } from "../features/movies/MovieSlice";


const Home = () => {
  const { year } = useSelector(getAllData);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const defaultSearchText = "Pokemon";
    const defaultSearchType = "";
    dispatch(
      fetchContent({
        searchText: defaultSearchText,
        searchType: defaultSearchType,
        year,
      })
    );
  }, []);

  return (
    <div>
      <MovieList />
    </div>
  );
};
export default Home;
