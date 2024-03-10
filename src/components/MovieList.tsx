import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { fetchContent, getAllData } from "../features/movies/MovieSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "src/components/ui/pagination";

const MovieList = () => {
  const dispatch = useDispatch();
  const { content, currentPage, totalResults ,searchText, searchType,year } =
    useSelector(getAllData);

  useEffect(() => {
    dispatch(
      fetchContent({ searchText, searchType, page: currentPage , year }) as any
    );
  }, [dispatch, searchText, searchType, currentPage]);

  const handlePageChange = (newPage:number) => {
    dispatch(fetchContent({ searchText, searchType, page: newPage , year}) as any);
  };

  const renderContent = content && content.length ? (
    content.map((item, index) => <MovieCard key={index} data={item} />)
  ) : (
    <p>No content found</p>
  );

  return (
    <div className="mx-4 md:mx-10 text-white">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-5">
        {renderContent}
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {currentPage <  Number(totalResults) / 10 && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MovieList;
