import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../6.1/app.js";
import { randomNameGenerator } from "../utils.js";
import { loadEnvFile } from "node:process";
loadEnvFile();
/**
 * L'état de votre application doit être stable après le lancement des tests
 * Ici idéalement faudrait mocker la base de données pour éviter une connexion directe
 * mock = simulation d'un programme (fonction, api, module, etc.)
 * L'option choisit ici pour simplifier ce test est l'utilisation d'une autre BDD dédiées aux tests
 */

describe("Testing routes /teams", () => {
  let id = beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST, {  bufferCommands: false });
  });

  beforeEach(async () => {
    try {
      const db = mongoose.connection.db;
      await db.collection("teams").deleteMany({});
      await db.collection("teams").insertMany([
        { name: "psg", country: "France" },
        { name: "arsenal", country: "UK" },
        { name: "barcelona", country: "Spain" },
        { name: "AC Milan", country: "Italy" },
      ]);
      const { _id } = await db.collection("teams").findOne({ name: "psg" });
      id = _id;
    } catch (err) {
      console.error("Erreur critique dans beforeEach :", err);
      throw err; // Permet de stopper immédiatement les tests si l'insertion échoue
    }
  });

  afterAll(async () => {
    await mongoose.connecttion.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("Testing GET /teams", () => {
    it("Should have status 200", () => {
      return request(app) // Arrange
        .get("/teams") // Act
        .expect(200); // Assert
    });
    // it() ou son alias test() effectue le test avec une assertion
    it("Should have JSON data", () => {
      return request(app).get("/teams").expect("Content-Type", /json/);
    });

    it("Should have a response with success and data keys", async () => {
      const { body } = await request(app).get("/teams");
      expect(body.success).toBeDefined();
      expect(body.data).toBeDefined();
    });

    it("Should have a response with data key as an array", async () => {
      const { body } = await request(app).get("/teams");
      expect(Array.isArray(body.data)).toBeTruthy();
    });

    it("Should have a response with success equals true", async () => {
      const { body } = await request(app).get("/teams");
      expect(body.success).toBe(true);
    });
  });

  describe("Testing GET /teams/:id", () => {
    it("Should have 400 when id is not a MongoDB id format", () => {
      return request(app).get("/teams/ko").expect(400);
    });

    it("Should have a team with _id, name and country properties", async () => {
      const { body } = await request(app).get(`/teams/${id}`);
      console.log('body', body)
      expect(Object.keys(body.data)).toEqual(["_id", "name", "country", "__v"]);
    });

    it("Should not have an array of teams", async () => {
      const { body } = await request(app).get(`/teams/${id}`);
      expect(Array.isArray(body.data)).toBe(false);
    });
  });

  describe("Testing POST /teams", () => {
    it("Should GET status 201", () => {
      const name = randomNameGenerator(5);
      request(app).post("/teams").send({ name, country: "France" }).expect(201);
    });

    it("Should have success key equals true", async () => {
      const name = randomNameGenerator(4);
      const { body } = await request(app)
        .post("/teams")
        .send({ name, country: "France" });
      expect(body.success).toBe(true);
    });

    it("Should have data._id equals to MongoDB _id", async () => {
      const name = randomNameGenerator();
      const { body } = await request(app)
        .post("/teams")
        .send({ name, country: "France" });
      // document id _id généré par MongoDB commence par 69 et fait exactement 24 caractères
      expect(body.data._id).toMatch(/^69.{22}$/);
    });

    describe("Testing POST /teams duplicate name", () => {
      it("Should have a duplicate name error message", async () => {
        const name = randomNameGenerator();
        await request(app).post("/teams").send({ name, country: "France" });
        const { body } = await request(app)
          .post("/teams")
          .send({ name, country: "France" });
        expect(body).toEqual({
          data: { error: `Duplicate name ${name}` },
          success: false,
        });
      });

      it("Should have status 400", async () => {
        const name = randomNameGenerator();
        await request(app).post("/teams").send({ name, country: "France" });
        await request(app)
          .post("/teams")
          .send({ name, country: "France" })
          .expect(400);
      });
    });
  });
});
