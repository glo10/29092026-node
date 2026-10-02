import { describe, test, it } from "vitest"; // test() a un alias it()
import request from "supertest"; // permet de tester les routes
import app from "../../../exercices/corrections/5.3/app.js";

describe("Testing Routes", () => {
  it("GET /teams  : Should have return JSON content", () => {
    return request(app) // Arrange
      .get("/teams") // Act
      .expect("Content-Type", /json/) // Assert
  });

  it("GET / : Should have status=200", () => {
    return request(app)
      .get("/teams")
      .expect(200)
  });

  it("GET /teams/1 : Should have an object with name property", () => {
    return request(app)
      .get("/teams/15")
      .then((response) => {
        expect(response.body.name).toEqual("PSG");
      });
  });
});
