export const removeAllResults = () => {
    const resultsList = document.getElementById("results-list");
    while (resultsList.lastElementChild) {
        resultsList.removeChild(resultsList.lastElementChild);
    }
};

export const buildResultItems = (resultArray) => {
    resultArray.forEach((result, index) => {
        const resultItem = createResultItem(result, index + 1);
        document.getElementById("results-list").append(resultItem);
    });
};

const createResultItem = (result, index) => {
    const item = document.createElement("article");
    item.classList.add("result-item");
    // zero-padded index shown via CSS ::after
    item.setAttribute("data-index", String(index).padStart(2, "0"));

    // Title
    const titleEl = document.createElement("div");
    titleEl.classList.add("result-item__title");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    titleEl.append(link);
    item.append(titleEl);

    // Body (image + excerpt)
    const body = document.createElement("div");
    body.classList.add("result-item__body");

    if (result.img) {
        body.append(createImageElement(result));
    }

    body.append(createExcerptElement(result));
    item.append(body);

    return item;
};

const createImageElement = (result) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("result-item__image");
    const img = document.createElement("img");
    img.src = result.img;
    img.alt = result.title;
    img.loading = "lazy";
    wrapper.append(img);
    return wrapper;
};

const createExcerptElement = (result) => {
    const p = document.createElement("p");
    p.classList.add("result-item__excerpt");
    p.textContent = result.text;
    return p;
};

export const clearStatsText = () => {
    document.getElementById("results-stats").textContent = "";
};

export const updateStatsText = (resultCount) => {
    const el = document.getElementById("results-stats");
    if (resultCount > 0) {
        el.textContent = `${resultCount} record${resultCount !== 1 ? "s" : ""} retrieved`;
    } else {
        el.textContent = "No records found";
    }
};