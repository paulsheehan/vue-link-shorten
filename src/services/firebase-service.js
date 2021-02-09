const baseUrl = "http://localhost:3000";

export function postApiLink(destination) {
  let url = baseUrl + "/test-links";
  let body = JSON.stringify({
    destination: destination,
  });

  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: body,
  })
    .catch((err) => {
      console.log(err);
    })
    .then((response) => {
      // Can make changes based on the response type at this point
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    });
}
