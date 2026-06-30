// --- DATA FUNCTIONS MODULE --- //

export const getSearchTerm = () => {
    const rawTerm = document.getElementById("search-input").value.trim();
    const normalized = rawTerm.replace(/[ ]{2,}/gi, " ");
    return normalized;
};

export const fetchSearchResults = async (searchTerm) => {
    const apiUrl = buildApiUrl(searchTerm);
    const rawData = await requestData(apiUrl);
    if (rawData?.query) {
        return parseWikiResults(rawData.query.pages);
    }
    return [];
};

const buildApiUrl = (searchTerm) => {
    const maxChars = getExcerptLength();
    const raw = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    return encodeURI(raw);
};

const getExcerptLength = () => {
    const viewportWidth = window.innerWidth || document.body.clientWidth;
    if (viewportWidth < 414) return 65;
    if (viewportWidth < 1400) return 120;
    return 160;
};

const requestData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("NexuSearch fetch error:", error);
        return null;
    }
};

const parseWikiResults = (pages) => {
    return Object.keys(pages).map((key) => {
        const page = pages[key];
        return {
            id: key,
            title: page.title,
            text: page.extract ?? "",
            img: page.thumbnail?.source ?? null,
        };
    });
};