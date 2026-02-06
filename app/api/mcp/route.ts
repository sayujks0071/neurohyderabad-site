import { NextRequest, NextResponse } from 'next/server';

/**
 * OpenAI Apps SDK compatible MCP Server
 * Implements the Model Context Protocol over HTTP
 * 
 * Reference: https://developers.openai.com/apps-sdk/concepts/mcp-server/
 */

const TOOLS = [
  {
    name: 'get_medical_info',
    description: 'Search for medical information and doctor specialized knowledge from our clinical documents.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The medical question or condition to search for' }
      },
      required: ['query']
    }
  },
  {
    name: 'book_appointment',
    description: 'Launch the interactive appointment booking form for a patient.',
    inputSchema: {
      type: 'object',
      properties: {
        patientName: { type: 'string' },
        service: { type: 'string', description: 'Specialty or condition (e.g., Spine Surgery, Trigeminal Neuralgia)' },
        preferredDate: { type: 'string', description: 'Preferred date (YYYY-MM-DD)' }
      },
      required: ['patientName', 'service']
    },
    // OpenAI Apps SDK specific metadata
    _meta: {
      "openai/outputTemplate": "ui://widget/appointment-booking.html",
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Preparing secure booking form...",
      "openai/toolInvocation/invoked": "Booking form ready"
    }
  },
  {
    name: 'submit_appointment',
    description: 'Finalize and submit the appointment booking to the clinic system.',
    inputSchema: {
      type: 'object',
      properties: {
        patientName: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        service: { type: 'string' },
        appointmentDate: { type: 'string' },
        appointmentTime: { type: 'string' },
        reason: { type: 'string' },
        age: { type: 'string' },
        gender: { type: 'string', enum: ['male', 'female', 'other'] },
        painScore: { type: 'number', description: 'Pain intensity score from 1-10' },
        mriScanAvailable: { type: 'boolean', description: 'Whether the patient has recent MRI/CT scan reports' }
      },
      required: ['patientName', 'phone', 'appointmentDate', 'appointmentTime', 'reason']
    }
  },
  {
    name: 'check_site_health',
    description: 'Get real-time SEO and site health status report for drsayuj.info.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'monitor_competitors',
    description: 'Analyze competitor content and identify content gaps.',
    inputSchema: {
      type: 'object',
      properties: {
        competitorUrl: { type: 'string', description: 'URL of the competitor to analyze' }
      }
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, params, id } = body;

    console.log(`MCP Request [${method}] id:${id}`, params);

    switch (method) {
      case 'tools/list':
      case 'list_tools':
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: { tools: TOOLS }
        });

      case 'tools/call':
      case 'call_tool':
        return await handleCallTool(params.name, params.arguments, id);

      default:
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` }
        }, { status: 404 });
    }
  } catch (error) {
    console.error('MCP Server Error:', error);
    return NextResponse.json({
      jsonrpc: '2.0',
      error: { code: -32603, message: 'Internal error' }
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
        try {
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Gemini search timeout')), 4000)
          );
          
          const geminiFetch = fetch(`${baseUrl}/api/gemini-files/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: args.query,
              searchType: 'medical',
              maxResults: 3
            })
          });
          
          const geminiResponse = await Promise.race([geminiFetch, timeoutPromise]);
          
          if (!geminiResponse.ok) {
            throw new Error(`Gemini API returned ${geminiResponse.status}`);
          }
          
          const geminiData = await geminiResponse.json();
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: geminiData.answer || 'No specific match found.' }],
              metadata: { sources: geminiData.sources || [] }
            }
          });
        } catch (error) {
          // Return a graceful fallback instead of failing
          console.warn('MCP get_medical_info error:', error instanceof Error ? error.message : error);
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: 'Medical information search is temporarily unavailable. Please contact the clinic directly for detailed information.' }],
              metadata: { sources: [] }
            }
          });
        }

      case 'book_appointment':
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{
              type: 'text',
              text: `I've opened the booking form for ${args.patientName}. You can fill in the preferred time and details directly in the widget below.`
            }],
            structuredContent: {
              patientName: args.patientName,
              service: args.service,
              preferredDate: args.preferredDate
            },
            _meta: {
              "openai/outputTemplate": "ui://widget/appointment-booking.html"
            }
          }
        });

      case 'submit_appointment':
        const submitResponse = await fetch(`${baseUrl}/api/appointments/submit`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-booking-source': 'openai-apps-sdk'
          },
          body: JSON.stringify({
            patientName: args.patientName,
            phone: args.phone,
            email: args.email || `guest_${Date.now()}@drsayuj.info`, // Fallback for email if not provided
            age: args.age || "30",
            gender: args.gender || "other",
            appointmentDate: args.appointmentDate,
            appointmentTime: args.appointmentTime,
            reason: args.reason,
            painScore: args.painScore !== undefined ? args.painScore : 5,
            mriScanAvailable: args.mriScanAvailable !== undefined ? args.mriScanAvailable : false
          })
        });
        
        const submitData = await submitResponse.json();
        if (submitResponse.ok) {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              success: true,
              confirmation: submitData.confirmationMessage,
              content: [{ type: 'text', text: `Appointment request submitted successfully! ${submitData.confirmationMessage}` }]
            }
          });
        } else {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            error: { code: -32000, message: submitData.error || 'Submission failed' }
          });
        }

      case 'check_site_health':
        const healthResponse = await fetch(`${baseUrl}/api/health`);
        const healthData = await healthResponse.json();
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: `Site Status: ${healthData.status}\nLast Audit: ${healthData.at}\nVersion: ${healthData.version}` }]
          }
        });

      case 'monitor_competitors':
        // Mocking analysis for now - in production this would call src/lib/competitor-analysis.ts
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ 
              type: 'text', 
              text: `Competitor analysis for ${args.competitorUrl || 'main competitors'}: Identified gaps in "Minimally Invasive Spine Surgery" patient education content. Recommendation: Create a 5-part video series on recovery paths.` 
            }]
          }
        });

      default:
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          error: { code: -32602, message: `Tool not found: ${name}` }
        }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error calling tool ${name}:`, error);
    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32603, message: `Error executing tool: ${name}` }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Neurohyderabad MCP Server',
    status: 'active',
    version: '1.1.0',
    capabilities: { tools: true, resources: true }
  });
}
