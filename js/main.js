// --- MAIN JS ENTRY POINT --- //

import { setSearchFocus, handleSearchInput, clearSearchText, clearKeyListener, handleSearchKeydown } from "./searchBar.js";
import { removeAllResults, buildResultItems, clearStatsText, updateStatsText, showErrorText, showEmptySearchText } from "./searchResults.js";
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
    searchInput.addEventListener("keydown", handleSearchKeydown);

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
    if (searchTerm === "") {
        showEmptySearchText();
        return;
    }
    const results = await fetchSearchResults(searchTerm);
    if (results === null) {
        showErrorText();
        return;
    }
    if (results.length) buildResultItems(results);
    updateStatsText(results.length);
};