export default function ForceCacheClear() {
  return (
    <div>
      <h1>Cache Clear Test - {new Date().toISOString()}</h1>
      <p>This page forces a cache miss to test compression headers.</p>
      <p>Timestamp: {Date.now()}</p>
    </div>
  );
}
