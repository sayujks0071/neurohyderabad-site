import { NextRequest, NextResponse } from 'next/server';

/**
 * OpenAI Apps SDK compatible MCP Server
 * Implements the Model Context Protocol over HTTP
 */

// Define the tools available in this MCP server
const TOOLS = [
  {
    name: 'get_medical_info',
    description: 'Search for medical information and doctor specialized knowledge from our clinical documents.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The medical question or condition to search for'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'book_appointment',
    description: 'Propose an appointment booking for a patient.',
    inputSchema: {
      type: 'object',
      properties: {
        patientName: { type: 'string' },
        service: { type: 'string', description: 'Type of surgery or consultation needed' },
        preferredDate: { type: 'string', description: 'ISO date string' }
      },
      required: ['patientName', 'service']
    }
  },
  {
    name: 'check_site_health',
    description: 'Get the latest SEO and site health status report.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, params, id } = body;

    console.log(`MCP Request: ${method}`, params);

    // Handle JSON-RPC methods
    switch (method) {
      case 'tools/list':
      case 'list_tools': // Support both standard and common variations
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            tools: TOOLS
          }
        });

      case 'tools/call':
      case 'call_tool':
        return await handleCallTool(params.name, params.arguments, id);

      default:
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Method not found: ${method}`
          }
        }, { status: 404 });
    }
  } catch (error) {
    console.error('MCP Server Error:', error);
    return NextResponse.json({
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: 'Internal error'
      }
    }, { status: 500 });
  }
}

async function handleCallTool(name: string, args: any, id: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                 'http://localhost:3000');

  try {
    switch (name) {
      case 'get_medical_info':
        const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: args.query,
            searchType: 'medical',
            maxResults: 3
          })
        });
        
        const geminiData = await geminiResponse.json();
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: geminiData.answer || 'No information found in clinical documents.'
              }
            ],
            metadata: {
              sources: geminiData.sources || []
            }
          }
        });

      case 'book_appointment':
        // For now, just return a success message and instructions
        // In a real app, this might trigger a workflow or return a component URL
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `I've prepared a booking proposal for ${args.patientName} for ${args.service}. Please confirm to proceed.`
              }
            ],
            // OpenAI Apps SDK can render components if we provide a metadata.component
            _metadata: {
              component: {
                name: 'AppointmentBooking',
                props: {
                  patientName: args.patientName,
                  service: args.service,
                  preferredDate: args.preferredDate
                }
              }
            }
          }
        });

      case 'check_site_health':
        const healthResponse = await fetch(`${baseUrl}/api/health`, {
          method: 'GET'
        });
        const healthData = await healthResponse.json();
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Site Health Status: ${healthData.status || 'Unknown'}\nLast Checked: ${healthData.timestamp || 'N/A'}`
              }
            ]
          }
        });

      default:
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: `Tool not found: ${name}`
          }
        }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error calling tool ${name}:`, error);
    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32603,
        message: `Error executing tool: ${name}`
      }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Neurohyderabad MCP Server',
    status: 'active',
    version: '1.0.0',
    capabilities: {
      tools: true,
      resources: false
    }
  });
}
