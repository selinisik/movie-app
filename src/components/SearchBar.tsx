import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchParams, fetchContent } from "../features/movies/MovieSlice"; 
import { Input } from "../components/ui/input"; 
import { Button } from "../components/ui/button"; 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "../components/ui/select"; 

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("All");

  const dispatch = useDispatch();

  const SearchTypeToParam = () => {
    switch (searchType) {
      case "Movie":
        return "movie";
      case "Tv Series":
        return "series";
      case "Tv Series Episode":
        return "episode";
      default:
        return "";
    }
  };

const handleSearch = () => {
    dispatch(setSearchParams({ searchText, searchType: SearchTypeToParam() }));
    dispatch(fetchContent({ searchText, searchType: SearchTypeToParam() }) as any);
};

  return (
    <div className="flex gap-4 pb-4">
      <Input
        type="text"
        placeholder="Search Movies or Tv Shows"
        className="bg-zinc-900"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Select onValueChange={setSearchType}>
        <SelectTrigger className="w-48 bg-zinc-900">{searchType}</SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white text-lg">
          <SelectGroup>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="Tv Series">Tv Series</SelectItem>
            <SelectItem value="Tv Series Episode">Tv Series Episode</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Submit</Button>
    </div>
  );
};

export default SearchBar;
