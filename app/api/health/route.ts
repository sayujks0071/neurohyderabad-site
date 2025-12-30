export async function GET() {
  return new Response(JSON.stringify({ 
    ok: true, 
    at: new Date().toISOString(),
    status: 'healthy',
    version: '1.0.0'
  }), {
    headers: { 
      'content-type': 'application/json' 
    } 
  });
}
