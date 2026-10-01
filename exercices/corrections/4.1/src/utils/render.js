export const render = (
  response,
  status,
  body,
  contentType = { "content-type": "application/json" },
) => {
  response.writeHead(status, contentType);
  response.end(body);
};
