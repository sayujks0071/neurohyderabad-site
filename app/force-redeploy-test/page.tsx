export default function ForceRedeployTest() {
  return (
    <div>
      <h1>Force Redeploy Test - {new Date().toISOString()}</h1>
      <p>This page was created to force a cache miss and test deployment.</p>
      <p>Timestamp: {Date.now()}</p>
      <p>Random: {Math.random()}</p>
      <p>Deployment: {process.env.VERCEL_GIT_COMMIT_SHA || 'local'}</p>
    </div>
  );
}
