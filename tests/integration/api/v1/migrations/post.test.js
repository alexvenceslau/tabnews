import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST  /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running peding migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations/",
          {
            method: "POST",
          },
        );

        expect(response1.status).toBe(201);

        const responseBody = await response1.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const respons2 = await fetch(
          "http://localhost:3000/api/v1/migrations/",
          {
            method: "POST",
          },
        );

        expect(respons2.status).toBe(200);

        const respons2Body = await respons2.json();

        expect(Array.isArray(respons2Body)).toBe(true);
        expect(respons2Body.length).toBe(0);
      });
    });
  });
});
