import ApiTableView from './ApiTableView';

function Workouts() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  return <ApiTableView title="Workouts" endpoint={endpoint} />;
}

export default Workouts;
