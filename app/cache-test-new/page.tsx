export default function CacheTestNew() {
  return (
    <div>
      <h1>Cache Test New - {new Date().toISOString()}</h1>
      <p>This is a new page to test if deployments are working.</p>
      <p>Timestamp: {Date.now()}</p>
      <p>Random: {Math.random()}</p>
    </div>
  );
}
