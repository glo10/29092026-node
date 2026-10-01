const PORT = process.env.PORT
export const routes = [
  {
    route: "GET /users",
    description: "User list",
    path: `http://localhost:${PORT}/users`,
  },
  {
    route: " GET /users/?id=",
    description: "One user",
    schema: {
      id: "number",
    },
    path: `http://localhost:${PORT}/users/?id=`,
  },
  {
    route: "POST /users",
    description: "Add a new user",
    schema: {
      type: "application/json",
      body: {
        id: "number required",
        name: "string required",
        username: "string required",
        email: "string",
        address: {
          street: "string",
          suite: "string",
          city: "string",
          zipcode: "string",
          geo: {
            lat: "number",
            lng: "number",
          },
        },
      },
    },
  },
];
