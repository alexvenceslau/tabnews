import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  try {
    const firstQueryTimer = performance.now();

    const [maxConnectionsResult, superuserReservedConnectionsResult] =
      await database.query(
        "SHOW max_connections; SHOW superuser_reserved_connections; "
      );
    const firstQueryDuration = performance.now() - firstQueryTimer;

    const maxConnetionsValue = maxConnectionsResult.rows[0].max_connections;
    const maxConnetionsReservedValue =
      superuserReservedConnectionsResult.rows[0].superuser_reserved_connections;
    const maxConnections = maxConnetionsValue - maxConnetionsReservedValue;

    const secondQueryTimer = performance.now();
    const openConnectionsResult = await database.query({
      text: "SELECT numbackends as opened_connections FROM pg_stat_database WHERE datname = $1",
      values: [process.env.POSTGRES_DB],
    });

    const openConnectionsValue =
      openConnectionsResult.rows[0].opened_connections;
    const secondQueryDuration = performance.now() - secondQueryTimer;

    const thirdQueryTimer = performance.now();
    const versionResult = await database.query("SHOW server_version;");
    const versionResultValue = versionResult.rows[0].server_version;
    const thirdQueryDuration = performance.now() - thirdQueryTimer;

    response.status(200).json({
      updated_at: updatedAt,
      database: {
        status: "healthy",
        max_connections: maxConnections,
        opened_connections: openConnectionsValue,
        latency: {
          first_time_to_response: firstQueryDuration,
          second_time_to_response: secondQueryDuration,
          tird_time_to_response: thirdQueryDuration,
        },
        version: versionResultValue,
      },
    });
  } catch (error) {
    console.error(error);
    // response.status(200).json({
    //   updated_at: updatedAt,
    //   database: {
    //     status: "unhealthy",
    //   },
    // });
  }
}

export default status;
