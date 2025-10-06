import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database";
import migrator from "models/migrator";
import user from "models/user";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status/");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createUser(userOject) {
  return await user.create({
    username:
      userOject?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: userOject?.email || faker.internet.email(),
    password: userOject?.password || "validpassword",
  });
}

const orchestrator = {
  createUser,
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
};
export default orchestrator;
