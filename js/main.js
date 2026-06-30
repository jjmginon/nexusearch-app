// --- MAIN JS ENTRY POINT --- //

import { setSearchFocus, handleSearchInput, clearSearchText, clearKeyListener } from "./searchBar.js";
import { removeAllResults, buildResultItems, clearStatsText, updateStatsText } from "./searchResults.js";
import { getSearchTerm, fetchSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

/* Initialize App */

const initApp = () => {
    setSearchFocus();

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", handleSearchInput);

    const clearBtn = document.getElementById("search-clear");
    clearBtn.addEventListener("click", clearSearchText);
    clearBtn.addEventListener("keydown", clearKeyListener);

    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", onSearchSubmit);
};

const onSearchSubmit = (event) => {
    event.preventDefault();
    removeAllResults();
    runSearch();
    setSearchFocus();
};

const runSearch = async () => {
    clearStatsText();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const results = await fetchSearchResults(searchTerm);
    if (results.length) buildResultItems(results);
    updateStatsText(results.length);
};