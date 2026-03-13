import ApiTableView from './ApiTableView';

function Teams() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  return <ApiTableView title="Teams" endpoint={endpoint} />;
}

export default Teams;
