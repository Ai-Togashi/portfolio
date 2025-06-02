'use client';

import { useEffect, useState } from 'react';

export default function ApiTestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage('❌ APIエラー: ' + err.message));
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-xl font-bold mb-4">API連携テスト</h1>
      <p className="text-lg">{message}</p>
    </main>
  );
}
