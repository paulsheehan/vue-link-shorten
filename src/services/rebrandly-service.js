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

export function postApiLink() {
  let url = baseUrl + "/links";
  let test_body = {
    title: "20somethingdublin",
    destination: "https://www.20somethingdublin.com/",
  };
  console.log("Request body:", test_body);
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "*/*",
      "Cache-Control": "no-cache",
    },
    body: test_body,
  })
    .then((response) => {
      // Can make changes based on the response type at this point
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}
