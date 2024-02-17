import { useState, useEffect } from 'react';
import Logo from './Logo';
import Main from './Main';
import NavBar from './NavBar';
import NumResults from './NumResults';
import SearchBar from './SearchBar';
import Box from './Box';
import SearchList from './SearchList';
import WatchedBoxList from './WatchedBoxList';
import WatchedBoxSummary from './WatchedBoxSummary';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import MovieDetails from './MovieDetails';
import { useMovies } from './useMovies';
import { useLocalStorage } from './useLocalStorage';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorage([], 'watched');

  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <SearchList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedBoxSummary watched={watched} />
              <WatchedBoxList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
