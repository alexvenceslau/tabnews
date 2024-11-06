import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET  /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retreiving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status/");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.database).toBeDefined();
      expect(responseBody.database.max_connections).toBeDefined();
      expect(responseBody.database.opened_connections).toEqual(1);
      expect(
        responseBody.database.latency.first_time_to_response,
      ).toBeDefined();
      expect(
        responseBody.database.latency.second_time_to_response,
      ).toBeDefined();
      expect(responseBody.database.latency.tird_time_to_response).toBeDefined();
      expect(responseBody.database.version).toBeDefined();
      expect(responseBody.database.version).toEqual("16.0");
    });
  });
});
