export const fetchFunction = async (
  endpoint: string,
  method: string,
  data: {}
) => {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "GET" ? undefined : JSON.stringify(data),
    });
    return await response;
  } catch (err) {
    console.log(err);
  }
};
