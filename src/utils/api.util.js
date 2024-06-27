export const withToken = (headers) => {
  // Extract jwt from local-storage
  const jwt = localStorage.getItem("jwt");

  headers.set("Authorization", `Bearer ${jwt}`);

  return headers;
};
