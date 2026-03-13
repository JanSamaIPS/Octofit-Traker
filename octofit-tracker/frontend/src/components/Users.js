import ApiTableView from './ApiTableView';

function Users() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  return <ApiTableView title="Users" endpoint={endpoint} />;
}

export default Users;
