/* Cached results are stored as an Array */

export function getAllCachedResults() {
  let cachedResults = JSON.parse(localStorage.getItem("cachedResults"));
  if (cachedResults) {
    return cachedResults;
  }
}

// Display results "History" when app mounts
export function getLatestCachedResults() {
  let cachedResults = JSON.parse(localStorage.getItem("cachedResults"));
  if (cachedResults) {
    return cachedResults.slice(-3).reverse();
  } else {
    return null;
  }
}

// Return cached result if that url was used before
export function getSingleCachedResult(url) {
  let cachedResults = JSON.parse(localStorage.getItem("cachedResults"));
  if (cachedResults) {
    return cachedResults.find((result) => {
      return result.data.destination === url;
    });
  } else {
    return null;
  }
}

export function saveNewCachedResult(data) {
  let newResult = {
    data: data.data,
    copied: data.copied,
  };
  let cachedResults = JSON.parse(localStorage.getItem("cachedResults"));
  if (cachedResults) {
    cachedResults.push(newResult);
  } else {
    cachedResults = [];
    cachedResults.push(newResult);
  }
  localStorage.setItem("cachedResults", JSON.stringify(cachedResults));
}
