import WatchedBoxListItem from './WatchedBoxListItem';

export default function WatchedBoxList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedBoxListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
