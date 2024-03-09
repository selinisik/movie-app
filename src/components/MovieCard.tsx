import { Movie } from "@/features/movies/MovieSlice";
import { Card } from "./ui/card";

export interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="bg-zinc-900 border border-zinc-400 relative rounded-md">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full object-cover rounded-md"
      />
      <div className="absolute bottom-0 flex items-center justify-center backdrop-blur-md bg-[#09090B4D] text-white w-full p-4 rounded-b-md h-20 ">
        <p className="text-white font-serif overflow-hidden text-ellipsis text-center">{movie.Title}</p>
      </div>
    </Card>
  );
};
export default MovieCard;
