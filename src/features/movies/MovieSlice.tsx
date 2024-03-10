import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovieApi from "../../api/MovieApi";

export interface Movie {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieState {
  content: Movie[];
  totalResults: string;
  response: string;
  searchText: string;
  searchType: string;
  selectedDetails: SelectedDetailsType;
  currentPage: number;
  
}

interface ResponsePayload {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

const initialState: MovieState = {
  content: [],
  totalResults: "",
  response: "",
  searchText: "Pokemon",
  searchType: "",
  selectedDetails: {},
  currentPage: 1,
};

interface SelectedDetailsType {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

interface Rating {
  Source: string;
  Value: string;
}

const apiKey = process.env.REACT_APP_API_KEY;

function reject(error: string): any {
  throw new Error("Function not implemented.");
}

export const fetchContent = createAsyncThunk(
  "movies/fetchContent",
  async (
    { searchText, searchType , page=1}: { searchText: string; searchType: string; page?: number},
    { rejectWithValue }
  ) => {
    try {
      const typeParam =
        searchType && searchType !== "All" ? `&type=${searchType}` : "";
      const response = await MovieApi.get<ResponsePayload>(
        `https://www.omdbapi.com/?apiKey=${apiKey}&s=${searchText}${typeParam}&page=${page}`
      );
      return {
        content: response.data.Search,
        totalResults: response.data.totalResults,
        response: response.data.Response,
        currentPage: page,
      };
    } catch (error) {
      return rejectWithValue("API error");
    }
  }
);

export const fetchDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (imdbID: string) => {
    const response = await MovieApi.get<SelectedDetailsType>(
      `https://www.omdbapi.com/?apiKey=${apiKey}&i=${imdbID}&plot=full`
    );
    return response.data.Response === "True"
      ? response.data
      : reject("Failed to fetch details");
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<{ searchText: string; searchType: string }>
    ) => {
      state.searchText = action.payload.searchText;
      state.searchType = action.payload.searchType;
      state.currentPage = 1;
    },
    removeSelectedDetails: (state) => {
      state.selectedDetails = initialState.selectedDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.content = action.payload.content;
        state.totalResults = action.payload.totalResults;
        state.response = action.payload.response;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.selectedDetails = action.payload;
      });
  },
});

export const { setSearchParams, removeSelectedDetails } = movieSlice.actions;
export const getAllData = (state: { movies: MovieState }) => state.movies;
export default movieSlice.reducer;
