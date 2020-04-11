import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

// A Promise can have 3 states: Pending, fulfilled or rejected
// Fulfilled: When the request succeeds, we can acces the data
export function get() {
  axios.get("http://localhost:3000/orders/1").then(({ data }) => {
    setText(JSON.stringify(data));
  });
}
//Rejected:
export function getCatch() {
  axios
    .get("http://localhost:3000/orders/123")
    .then(({ data }) => {
      setText(JSON.stringify(data));
    })
    .catch((error) => {
      setText(error);
    });
}

export function chain() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    });
}

export function chainCatch() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    })
    .catch((err) => setText(err)); // This catch will handle all the errors of my promise stack
}

export function final() {
  showWaiting();
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    })
    .catch((err) => setText(err))
    .finally(() => {
      setTimeout(() => {
        hideWaiting();
      }, 1500);
      appendText(" -- Completely done");
    });
}
