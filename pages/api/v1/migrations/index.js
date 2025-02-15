import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import migrator from "models/migrator";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const peddingMigrations = await migrator.listPendingMigrations();
  response.status(200).json(peddingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPendingMigrations();

  if (migratedMigrations.length > 0) {
    response.status(201).json(migratedMigrations);
  }
  return response.status(200).json(migratedMigrations);
}
