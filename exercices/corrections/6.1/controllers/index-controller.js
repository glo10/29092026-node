export const getDocumentation = (_, res) => {
  const { PORT } = process.env;
  const documentation = [
    {
      route: "GET /teams",
      description: "Teams list",
      path: `http://localhost:${PORT}/teams`,
    },
    {
      route: " GET /teams/:id",
      description: "One team",
      schema: {
        id: "String (MongoDB ID)",
      },
      path: `http://localhost:${PORT}/teams/6abfdb4ef60b977a669c856d`,
    },
    {
      route: "POST /teams",
      description: "Add a new team",
      schema: {
        type: "application/json",
        body: {
          name: "string",
          country: "string",
        },
      },
    },
    //...
  ];
  res.json({ routes: documentation, version: "2.1.0" });
};