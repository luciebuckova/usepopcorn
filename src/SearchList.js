import SearchListItem from './SearchListItem';

export default function SearchList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <SearchListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
