import { Movie } from "@/src/features/movies/MovieSlice";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

export interface MovieCardProps {
  data: Movie;
}
const MovieCard = ({ data }: MovieCardProps) => {
  return (
    <Link to={`movie/${data.imdbID}`}>
      <Card className="bg-zinc-900 border border-zinc-400 relative rounded-md aspect-[9/16]">
        <img
          src={data.Poster}
          alt={data.Title}
          className="w-full h-full object-cover rounded-md"
        />
         <div className="absolute bottom-0 flex flex-col items-center justify-center backdrop-blur-md bg-[#09090B4D] text-white w-full p-4 rounded-b-md h-28 ">
          <p className="text-white font-serif overflow-hidden text-ellipsis whitespace-nowrap text-center max-w-full">
            {data.Title}
          </p>
          <p className="text-white font-serif text-center">
            Released in {data.Year}
          </p>
          <p className="text-white font-serif text-center">
            IMDb ID: {data.imdbID}
          </p>
        </div>
      </Card>
    </Link>
  );
};
export default MovieCard;
