import ApiTableView from './ApiTableView';

function Leaderboard() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  return <ApiTableView title="Leaderboard" endpoint={endpoint} />;
}

export default Leaderboard;
