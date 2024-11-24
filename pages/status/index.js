import useSWR from "swr";
async function fetchAPI(key) {
  const response = await fetch(key);

  const responseBody = await response.json();

  return responseBody;
}

export default function statusPage() {
  return (
    // React Fragment component em branco (usado para não adicionar um elemento HTML desnecessário)
    <>
      <h1>Status</h1>
      <UpdatedAd />
    </>
  );
}

function UpdatedAd() {
  const { isLoading, data } = useSWR("/api/v1/status/", fetchAPI, {
    refreshInterval: 10000,
  });

  let updatedAtText = "Carregando...";
  let dbStatusText = "Carregando...";
  let dbMxConnectionsText = "Carregando...";
  let dbOpenConnectionsText = "Carregando...";
  let dbVersionText = "Carregando...";
  let dbFstResponseText = "Carregando...";
  let dbSndResponseText = "Carregando...";
  let dbTrdResponseText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    dbStatusText = data.database.status;
    dbMxConnectionsText = data.database.max_connections;
    dbOpenConnectionsText = data.database.opened_connections;
    dbVersionText = data.database.version;
    dbFstResponseText = (
      data.database.latency.first_time_to_response / 1000
    ).toFixed(2);
    dbSndResponseText = (
      data.database.latency.second_time_to_response / 1000
    ).toFixed(2);
    dbTrdResponseText = (
      data.database.latency.tird_time_to_response / 1000
    ).toFixed(2);
  }

  return (
    <>
      <div>
        Última atualização: <b>{updatedAtText}</b>
      </div>
      <div>Database:</div>
      <ul>
        <li>
          Status: <b>{dbStatusText}</b>
        </li>
        <li>
          Versão: <b>{dbVersionText}</b>
        </li>
        <li>
          Máximo de conexões: <b>{dbMxConnectionsText}</b>
        </li>
        <li>
          Conexções abertas: <b>{dbOpenConnectionsText}</b>
        </li>
        <li>
          Latência:
          <ul>
            <li>
              Primeira Resposta: <b>{dbFstResponseText}</b> seg
            </li>
            <li>
              Segunda Resposta: <b>{dbSndResponseText}</b> seg
            </li>
            <li>
              Terceira Resposta: <b>{dbTrdResponseText}</b> seg
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}
