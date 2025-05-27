import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function Home() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'words'));
        const fetchedWords = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWords(fetchedWords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching words:', error);
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📚 Saved Words</h2>

      {loading ? (
        <p>Loading...</p>
      ) : words.length === 0 ? (
        <p>No words logged yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {words.map((word) => (
            <li
              key={word.id}
              style={{
                borderLeft: `8px solid ${
                  word.tag === 'Mastered'
                    ? 'green'
                    : word.tag === 'Familiar'
                    ? 'orange'
                    : 'red'
                }`,
                background: '#f9f9f9',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h3>{word.word}</h3>
              <p><strong>Definition:</strong> {word.definition}</p>
              <p><strong>Tag:</strong> {word.tag}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

