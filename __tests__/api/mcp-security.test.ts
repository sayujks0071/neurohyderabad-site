import { expect, test, describe, vi, afterEach } from 'vitest'
import { POST } from '../../app/api/mcp/route'
import { NextRequest } from 'next/server'

describe('MCP Endpoint Security', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should rate limit excessive requests', async () => {
    // Mock console to keep output clean
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const ip = '192.168.1.100'
    const limit = 10

    // Create a helper to generate requests
    const createRequest = () => {
      const req = new NextRequest('http://localhost:3000/api/mcp', {
        method: 'POST',
        headers: {
          'x-forwarded-for': ip,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          id: 1
        })
      })
      return req
    }

    // Send requests up to the limit (10)
    for (let i = 0; i < limit; i++) {
      const res = await POST(createRequest())
      expect(res.status).toBe(200)
    }

    // Send one more request - should fail with 429
    const blockedRes = await POST(createRequest())

    // This assertion is expected to fail BEFORE the fix is implemented
    expect(blockedRes.status).toBe(429)

    // Verify headers (optional but good)
    // expect(blockedRes.headers.get('X-RateLimit-Remaining')).toBe('0')
  })
})
