import { useState } from 'react';

const API_URL = 'https://data-science-models.onrender.com/api/algorithms';

const CATEGORIES = [
  'Computational Thinking',
  'Mathematical Modelling',
  'Statistical Modeling',
  'Generative AI',
  'Other',
];

const LANGUAGES = ['python', 'javascript', 'r', 'julia', 'sql', 'other'];

export default function AlgorithmForm({ onSaved }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    codeSnippet: '',
    language: 'python',
    category: 'Computational Thinking',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSuccess('Algorithm saved successfully!');
      setForm({
        title: '',
        description: '',
        codeSnippet: '',
        language: 'python',
        category: 'Computational Thinking',
      });

      if (onSaved) onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="algo-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        <span className="form-icon">✦</span> New Algorithm
      </h2>

      {error && <div className="msg msg-error">{error}</div>}
      {success && <div className="msg msg-success">{success}</div>}

      <div className="form-grid">
        <label className="form-label">
          <span>Title *</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Bubble Sort"
          />
        </label>

        <label className="form-label">
          <span>Language</span>
          <select name="language" value={form.language} onChange={handleChange}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          <span>Category</span>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-label">
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={2}
          placeholder="Brief description of the algorithm…"
        />
      </label>

      <label className="form-label">
        <span>Code Snippet *</span>
        <textarea
          className="code-input"
          name="codeSnippet"
          value={form.codeSnippet}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Paste your code here…"
        />
      </label>

      <button type="submit" className="btn-submit" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save Algorithm'}
      </button>
    </form>
  );
}
