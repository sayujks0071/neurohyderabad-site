"use client";

import { Canvas } from "@/src/components/ai-elements/canvas";
import { Edge } from "@/src/components/ai-elements/edge";
import {
  Node,
  NodeContent,
  NodeHeader,
  NodeTitle,
} from "@/src/components/ai-elements/node";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReactFlow, ReactFlowProvider } from "@xyflow/react";

const nodeIds = {
  consult: "consult",
  imaging: "imaging",
  conservative: "conservative",
  surgical: "surgical",
  eval: "eval",
  recovery: "recovery",
  rehab: "rehab",
};

const initialNodes = [
  {
    data: {
      description: "Comprehensive evaluation of your symptoms, medical history, and physical condition.",
      handles: { source: true, target: false },
      label: "Initial Consultation",
      status: "completed",
    },
    id: nodeIds.consult,
    position: { x: 50, y: 150 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Advanced diagnostic imaging like MRI or CT scans to pinpoint the issue.",
      handles: { source: true, target: true },
      label: "Diagnostic Imaging",
      status: "active",
    },
    id: nodeIds.imaging,
    position: { x: 450, y: 150 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Non-surgical treatments like physical therapy, medication, or injections.",
      handles: { source: true, target: true },
      label: "Conservative Care",
      status: "pending",
    },
    id: nodeIds.conservative,
    position: { x: 850, y: 0 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Minimally invasive or traditional surgical intervention if necessary.",
      handles: { source: true, target: true },
      label: "Surgical Intervention",
      status: "pending",
    },
    id: nodeIds.surgical,
    position: { x: 850, y: 300 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Review of treatment progress and adjusting the care plan.",
      handles: { source: true, target: true },
      label: "Re-evaluation",
      status: "pending",
    },
    id: nodeIds.eval,
    position: { x: 1250, y: 0 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Post-treatment healing and monitoring period.",
      handles: { source: true, target: true },
      label: "Recovery",
      status: "pending",
    },
    id: nodeIds.recovery,
    position: { x: 1250, y: 300 },
    type: "medicalNode",
  },
  {
    data: {
      description: "Restoring function and mobility through guided therapy.",
      handles: { source: false, target: true },
      label: "Rehabilitation",
      status: "pending",
    },
    id: nodeIds.rehab,
    position: { x: 1650, y: 150 },
    type: "medicalNode",
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: nodeIds.consult,
    target: nodeIds.imaging,
    type: "animated",
    animated: true,
  },
  {
    id: "edge-2",
    source: nodeIds.imaging,
    target: nodeIds.conservative,
    type: "animated",
    animated: true,
  },
  {
    id: "edge-3",
    source: nodeIds.imaging,
    target: nodeIds.surgical,
    type: "temporary",
    label: "If Severe",
  },
  {
    id: "edge-4",
    source: nodeIds.conservative,
    target: nodeIds.eval,
    type: "animated",
    animated: true,
  },
  {
    id: "edge-5",
    source: nodeIds.eval,
    target: nodeIds.surgical,
    type: "temporary",
    label: "If Unsuccessful",
  },
  {
    id: "edge-6",
    source: nodeIds.surgical,
    target: nodeIds.recovery,
    type: "animated",
    animated: true,
  },
  {
    id: "edge-7",
    source: nodeIds.eval,
    target: nodeIds.rehab,
    type: "animated",
    animated: true,
    label: "If Successful",
  },
  {
    id: "edge-8",
    source: nodeIds.recovery,
    target: nodeIds.rehab,
    type: "animated",
    animated: true,
  },
];

const nodeTypes = {
  medicalNode: ({
    data,
  }: {
    data: {
      label: string;
      description: string;
      handles: { target: boolean; source: boolean };
      status: string;
    };
  }) => {
    let statusColor = "bg-white border-slate-200";
    let badgeColor = "bg-slate-100 text-slate-600";

    if (data.status === "completed") {
      statusColor = "bg-emerald-50 border-emerald-200";
      badgeColor = "bg-emerald-100 text-emerald-700";
    } else if (data.status === "active") {
      statusColor = "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20";
      badgeColor = "bg-blue-100 text-blue-700";
    }

    return (
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-80`}>
        <NodeHeader className="pb-2">
          <div className="flex justify-between items-center w-full">
            <NodeTitle className="text-lg font-semibold text-slate-800">{data.label}</NodeTitle>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </span>
          </div>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-slate-600 leading-relaxed">{data.description}</p>
        </NodeContent>
      </Node>
    );
  },
};

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

// Component that uses useReactFlow must be wrapped in ReactFlowProvider
function CanvasWithControls() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Small delay to ensure everything is rendered before fitting
    const timer = setTimeout(() => {
      // Use standard react lifecycle instead of direct DOM manipulation if possible,
      // but in some edge cases (especially headless browsers) opacity stays 0.
      // Doing this via React Flow's fitView alone should be enough for standard browsers.
      window.requestAnimationFrame(() => {
        fitView({ padding: 0.2, duration: 800 });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return (
    <Canvas
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => {
        // Handle changes if needed (e.g. dragging)
        // For a static display, we can ignore this or implement basic update logic
        const newNodes = [...nodes];
        changes.forEach((change: any) => {
          if (change.type === 'position' && change.position) {
            const nodeIndex = newNodes.findIndex((n) => n.id === change.id);
            if (nodeIndex !== -1) {
              newNodes[nodeIndex] = {
                ...newNodes[nodeIndex],
                position: change.position,
              };
            }
          }
        });
        setNodes(newNodes);
      }}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.2}
      maxZoom={1.5}
      className="opacity-100 transition-opacity duration-500"
    />
  );
}

export default function PatientJourneyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Neurosurgery Patient Journey</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive roadmap of your care process</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full relative h-[calc(100vh-85px)]">
        <div className="absolute inset-0">
          <ReactFlowProvider>
            <CanvasWithControls />
          </ReactFlowProvider>
        </div>
      </main>
    </div>
  );
}
