import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieState {
  movies: Movie[];
  totalResults: number;
  Response: string;
}
interface MoviesPayload {
  Search: Movie[];
  totalResults: number;
  Response: string;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  Response: "",
};

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
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state: { movies: MovieState }) =>
  state.movies;
export default movieSlice.reducer;
