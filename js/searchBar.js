// --- SEARCH BAR MODULE --- //

export const setSearchFocus = () => {
    document.getElementById("search-input").focus();
};

export const handleSearchInput = () => {
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("search-clear");
    if (searchInput.value.length > 0) {
        clearBtn.classList.remove("search-bar__clear--hidden");
    } else {
        clearBtn.classList.add("search-bar__clear--hidden");
    }
};

export const clearSearchText = (event) => {
    event.preventDefault();
    document.getElementById("search-input").value = "";
    document.getElementById("search-clear").classList.add("search-bar__clear--hidden");
    setSearchFocus();
};

export const clearKeyListener = (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        document.getElementById("search-clear").click();
    }
};