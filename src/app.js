import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Filters from "./components/Filters";
import GamesTable from "./components/GamesTable";
import Pagination from "./components/Pagination";
import { getGames, getGenres } from "./utils/api";
/* INSTRUCTION: Import the fetchGames and fetchGenres functions from the utils/api file */

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  /* 
        INSTRUCTION: 
        - Use the useQuery hook to fetch games. 
        - May pass the page, limit, search, genre, and sort as query keys so that the data will be refetched when these values change. 
    */

  const {
    data: games = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games", search, genre, sort, page, limit],
    queryFn: () => getGames(search, genre, sort, page, limit),
  });

  /* INSTRUCTION: Use the useQuery hook to fetch genres */

  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  /* INSTRUCTION: Create functions to handle limit change */
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  /* INSTRUCTION: Create functions to handle search change */
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  /* INSTRUCTION: Create functions to handle sort change */
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handlePageChange = (newPage) => {
    /* INSTRUCTION: Update the page state */
    setPage(newPage);
  };

  const handleGenreChange = (newGenre) => {
    /* INSTRUCTION: Update the genre state and reset the page to 1 */
    setGenre(newGenre);
  };

  return (
    <div className="app">
      <h1>Games</h1>
      <Filters
        /* INSTRUCTION: 
                    - Pass the search, genre, sort, and limit states as props to the Filters component
                    - Pass the genres data as props to the Filters component
                */
        search={search}
        genre={genre}
        genres={genres}
        sort={sort}
        onGenreChange={handleGenreChange}
        /* 
                    INSTRUCTION:
                    - Pass the handleSearchChange, handleGenreChange, handleSortChange, and handleLimitChange functions as props to the Filters component
                */
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onLimitChange={handleLimitChange}
      />
      <GamesTable
        /* INSTRUCTION:
                    - Pass the games, isLoading, and isError states as props to the GamesTable component
                */
        games={games}
        isLoading={isLoading}
        isError={isError}
      />
      <Pagination
        /* INSTRUCTION:
                    - Pass games and handlePageChange function as props to the Pagination component
                */
        games={games}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
