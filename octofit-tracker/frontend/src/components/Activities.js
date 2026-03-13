import ApiTableView from './ApiTableView';

function Activities() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  return <ApiTableView title="Activities" endpoint={endpoint} />;
}

export default Activities;
