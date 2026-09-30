import { useEffect, useState } from 'react';

const API_URL = 'https://data-science-models.onrender.com/api/algorithms';

const CATEGORY_COLORS = {
  'Computational Thinking': '#6c5ce7',
  'Mathematical Modelling': '#00b894',
  'Statistical Modeling': '#0984e3',
  'Generative AI': '#e17055',
  Other: '#636e72',
};

export default function AlgorithmList({ refreshKey }) {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setAlgorithms(data);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="list-section">
        <h2 className="list-title">
          <span className="list-icon">⟐</span> Saved Algorithms
        </h2>
        <div className="list-status">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-section">
        <h2 className="list-title">
          <span className="list-icon">⟐</span> Saved Algorithms
        </h2>
        <div className="msg msg-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="list-section">
      <h2 className="list-title">
        <span className="list-icon">⟐</span> Saved Algorithms
        <span className="badge">{algorithms.length}</span>
      </h2>

      {algorithms.length === 0 ? (
        <div className="list-status">No algorithms yet — add one above!</div>
      ) : (
        <div className="card-grid">
          {algorithms.map((algo) => (
            <article className="algo-card" key={algo._id}>
              <div className="card-header">
                <h3 className="card-title">{algo.title}</h3>
                <span
                  className="card-badge"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[algo.category] || '#636e72',
                  }}
                >
                  {algo.category || 'Uncategorized'}
                </span>
              </div>

              {algo.description && (
                <p className="card-desc">{algo.description}</p>
              )}

              <div className="card-meta">
                <span className="lang-tag">{algo.language}</span>
                <span className="card-date">
                  {new Date(algo.createdAt).toLocaleDateString()}
                </span>
              </div>

              <pre className="card-code">
                <code>{algo.codeSnippet}</code>
              </pre>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
