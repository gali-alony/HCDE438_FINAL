import React from 'react';
import { useParams } from 'react-router-dom';

export default function WordDetail() {
  const { wordId } = useParams();
  return <h2>🔍 Word Detail for: {wordId}</h2>;
}

