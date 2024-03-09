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
  selectedDetails: selectedDetailsType;
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
  selectedDetails: {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  },
};

interface selectedDetailsType {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
interface Rating {
  Source: string;
  Value: string;
}

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
export const fetchDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (id: string) => {
    const response = await MovieApi.get<ResponsePayload>(
      `?apiKey=${apiKey}&i=${id}&Plot=full`
    );
    return {
      selectedDetails: response.data,
    };
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedDetails: (state) => {
      state.selectedDetails = initialState.selectedDetails;
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
      .addCase(fetchDetails.fulfilled, (state, action) => {
        console.log("Fetch Successful");
        state.selectedDetails = {
          ...state.selectedDetails,
          ...action.payload?.selectedDetails,
        };
      });
  },
});

export const { removeSelectedDetails } = movieSlice.actions;
export const getAllData = (state: { movies: MovieState }) => state.movies;
export default movieSlice.reducer;
