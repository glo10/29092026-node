#!bin/bash

# GET /
curl http://localhost:4100/

# GET /users
curl http://localhost:4100/users

# GET /users/?id=2
curl http://localhost:4100/users/?id=2

# GET /users/?id=8
curl http://localhost:4100/users/?id=8

# POST /users
curl -X POST http://localhost:4100/users \
  -H "Content-Type: application/json" \
  -d '{"id":11,"username":"Fredo","name":"fred"}'

# POST /users
curl -X POST http://localhost:4100/users \
  -H "Content-Type: application/json" \
  -d '{"id":12,"username":"JD","name":"John"}'