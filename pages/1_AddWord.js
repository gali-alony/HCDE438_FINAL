import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddWord() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('New');
  const [saved, setSaved] = useState(false);

  const fetchDefinition = async () => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();

      if (res.ok) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
        setError('');
        setSaved(false); // reset saved status
      } else {
        setDefinition('');
        setError(data.title || 'Word not found.');
      }
    } catch (err) {
      setError('Failed to fetch definition.');
      setDefinition('');
    }
  };

  const handleSave = async () => {
    if (!word || !definition) return;

    try {
      await addDoc(collection(db, 'words'), {
        word,
        definition,
        notes,
        tag,
        createdAt: Timestamp.now()
      });

      setSaved(true);
      setWord('');
      setDefinition('');
      setNotes('');
      setTag('New');
    } catch (err) {
      console.error('Error saving word:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) fetchDefinition();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>➕ Add a New Word</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit">Search</button>
      </form>

      {definition && (
        <div style={{ marginTop: '1rem', background: '#e0ffe0', padding: '1rem' }}>
          <strong>Definition:</strong> {definition}

          <div style={{ marginTop: '1rem' }}>
            <label>
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label>
              Familiarity:
              <select value={tag} onChange={(e) => setTag(e.target.value)} style={{ marginLeft: '0.5rem' }}>
                <option value="New">New</option>
                <option value="Familiar">Familiar</option>
                <option value="Mastered">Mastered</option>
              </select>
            </label>
          </div>

          <button onClick={handleSave} style={{ marginTop: '1rem' }}>Save to LexiLog</button>
        </div>
      )}

      {saved && (
        <div style={{ marginTop: '1rem', background: '#d0f0ff', padding: '1rem' }}>
          ✅ Word saved successfully!
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', background: '#ffe0e0', padding: '1rem' }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}



