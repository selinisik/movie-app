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
}
interface MoviesPayload {
  Search: Movie[];
  totalResults: number;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<MoviesPayload>) => {
      state.movies = action.payload.Search;
      state.totalResults = action.payload.totalResults;
    },
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state: { movies: MovieState }) =>
  state.movies.movies;
export default movieSlice.reducer;
