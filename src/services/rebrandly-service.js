const baseUrl = "http://localhost:3000";

export function getApiAccount() {
  let url = baseUrl + "/account";
  fetch(url)
    .then((response) => {
      // Can make changes based on the response type at this point
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

export function postApiLink(destination) {
  let url = baseUrl + "/links";
  let test_body = JSON.stringify({
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
    body: test_body,
  })
    .catch((err) => {
      console.log(err);
    })
    .then((response) => {
      // Can make changes based on the response type at this point
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
