import { useCallback, useEffect, useMemo, useState } from 'react';

function getIdentifier(item, index) {
  return item.id || item._id || item.uuid || item.username || `row-${index + 1}`;
}

function getLabel(item) {
  return item.name || item.title || item.username || item.user || item.team || 'N/A';
}

function ApiTableView({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      console.log(`${title} endpoint:`, endpoint);
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`${title} request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log(`${title} fetched data:`, data);

      const normalized = Array.isArray(data) ? data : data?.results || [];
      setItems(normalized);
    } catch (fetchError) {
      console.error(`${title} fetch error:`, fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const q = query.trim().toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
          <h2 className="h4 mb-0 text-primary-emphasis">{title}</h2>
          <div className="d-flex align-items-center gap-2">
            <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
              Open API
            </a>
            <button type="button" className="btn btn-primary" onClick={fetchData}>
              Refresh
            </button>
          </div>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-sm-8 col-md-6">
            <label htmlFor={`${title}-search`} className="form-label">
              Search data
            </label>
            <input
              id={`${title}-search`}
              type="text"
              className="form-control"
              placeholder={`Filter ${title.toLowerCase()} by any field`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>

        {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
        {error && <div className="alert alert-danger">Error loading {title.toLowerCase()}: {error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" style={{ width: '72px' }}>
                    #
                  </th>
                  <th scope="col">Identifier</th>
                  <th scope="col">Label</th>
                  <th scope="col">Data Preview</th>
                  <th scope="col" className="text-end" style={{ width: '140px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-body-secondary">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={getIdentifier(item, index)}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold text-break">{String(getIdentifier(item, index))}</td>
                      <td className="text-break">{String(getLabel(item))}</td>
                      <td className="text-break">
                        <small>{JSON.stringify(item).slice(0, 120)}...</small>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded small mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default ApiTableView;
