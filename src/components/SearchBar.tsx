import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams, fetchContent, getAllData, updateSearchYear } from "../features/movies/MovieSlice";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("All");

  const dispatch = useDispatch();
  const { year } = useSelector(getAllData);

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
    dispatch(setSearchParams({
      searchText,
      searchType: SearchTypeToParam(),
      year, 
    }));

    dispatch(fetchContent({
      searchText,
      searchType: SearchTypeToParam(),
      page: 1, 
      year,
    }) as any);
  };

  const generateYearOptions = () => {
    let years = [<SelectItem key="none" value="none">Year</SelectItem>];
    for (let i = 2024; i >= 1860; i--) {
      years.push(
        <SelectItem key={i} value={String(i)}>
          {i}
        </SelectItem>
      );
    }
    return years;
  };

  const handleYearChange = (newYear: string) => {
    if (newYear === "none") {
      dispatch(updateSearchYear(undefined));
      return;
    }
    const currentYear = newYear ? parseInt(newYear, 10) : undefined;
    dispatch(updateSearchYear(currentYear));
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
      <Select defaultValue="All" onValueChange={setSearchType}>
        <SelectTrigger className="w-48 bg-zinc-900">{searchType}</SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white">
          <SelectGroup>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="Tv Series">Tv Series</SelectItem>
            <SelectItem value="Tv Series Episode">Tv Series Episode</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select defaultValue="" onValueChange={handleYearChange}>
        <SelectTrigger className="w-48 bg-zinc-900">
          {year || "Year"}
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white">
          <SelectGroup>{generateYearOptions()}</SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Submit</Button>
    </div>
  );
};

export default SearchBar;
