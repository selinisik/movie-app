import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { getAllData } from "../features/movies/MovieSlice";

const MovieList = () => {
  const data = useSelector(getAllData);

  const renderContent =
    data.response == "True" && data.content.length ? (
      data.content.map((item, index) => <MovieCard data={item} key={index} />)
    ) : (
      <p>No content found</p>
    );

  return (
    <div className="mx-4 md:mx-10 text-white">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {renderContent}
      </div>
    </div>
  );
};

export default MovieList;
