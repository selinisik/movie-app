import MovieApi from "../../api/MovieApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Movie {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieState {
  movies: Movie[];
  tvSeries: Movie[];
  totalResultsMovies: string;
  ResponseMovies: string;
  totalResultsTvSeries: string;
  ResponseTvSeries: string;
}
interface ResponsePayload {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

const initialState: MovieState = {
  movies: [],
  tvSeries: [],
  totalResultsMovies: "",
  ResponseMovies: "",
  totalResultsTvSeries: "",
  ResponseTvSeries: "",
};

const apiKey = process.env.REACT_APP_API_KEY;
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const MovieText = "Pokemon";
  const response = await MovieApi.get<ResponsePayload>(
    `?apiKey=${apiKey}&s=${MovieText}&type=movie`
  );
  if (response.data.Response === "True" && response.data.Search) {
    return {
      Search: response.data.Search,
      totalResultsMovies: response.data.totalResults,
      ResponseMovies: response.data.Response,
    };
  } else {
    console.error("No movies found or API error");
  }
});

export const fetchTvSeries = createAsyncThunk(
  "movies/fetchTvSeries",
  async () => {
    const SeriesText = "Friends";
    const response = await MovieApi.get<ResponsePayload>(
      `?apiKey=${apiKey}&s=${SeriesText}&type=series`
    );
    if (response.data.Response === "True" && response.data.Search) {
      return {
        Search: response.data.Search,
        totalResultsTvSeries: response.data.totalResults,
        ResponseTvSeries: response.data.Response,
      };
    } else {
      console.error("No movies found or API error");
    }
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<MoviesPayload>) => {
      state.movies = action.payload.Search;
      state.totalResults = action.payload.totalResults;
      state.Response = action.payload.Response;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        console.log("Fetch Successful");
        state.movies = action.payload?.Search ?? [];
        state.totalResultsMovies = action.payload?.totalResultsMovies ?? "";
        state.ResponseMovies = action.payload?.ResponseMovies ?? "";
      })
      .addCase(fetchMovies.rejected, (state) => {
        console.log("Rejected");
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        console.log("Fetch Successful");
        state.tvSeries = action.payload?.Search ?? [];
        state.totalResultsTvSeries = action.payload?.totalResultsTvSeries ?? "";
        state.ResponseTvSeries = action.payload?.ResponseTvSeries ?? "";
      })
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllData = (state: { movies: MovieState }) => state.movies;
export default movieSlice.reducer;
