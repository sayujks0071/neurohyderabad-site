"use client";

import { Canvas } from "@/src/components/ai-elements/canvas";
import { Edge } from "@/src/components/ai-elements/edge";
import {
  Node,
  NodeContent,
  NodeHeader,
  NodeTitle,
} from "@/src/components/ai-elements/node";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReactFlow, ReactFlowProvider, applyNodeChanges, NodeChange } from "@xyflow/react";

// Use static string IDs to avoid server/client SSR hydration mismatches
const nodeIds = {
  start: "start",
  redFlags: "red-flags",
  emergencySurgery: "emergency-surgery",
  conservative: "conservative",
  eval6Weeks: "eval-6-weeks",
  improved: "improved",
  maintenance: "maintenance",
  mri: "mri",
  injection: "injection",
  surgeryDecision: "surgery-decision",
  microdiscectomy: "microdiscectomy",
};

const initialNodes = [
  {
    data: {
      description: "Patient presents with lower back pain radiating down the leg (Sciatica).",
      handles: { source: true, target: false },
      label: "Lower Back Pain & Sciatica",
      status: "active",
    },
    id: nodeIds.start,
    position: { x: 0, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Check for loss of bowel/bladder control or severe progressive weakness.",
      handles: { source: true, target: true },
      label: "Red Flag Symptoms?",
      status: "pending",
    },
    id: nodeIds.redFlags,
    position: { x: 350, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Immediate Cauda Equina decompression surgery to prevent permanent damage.",
      handles: { source: false, target: true },
      label: "Emergency Surgery",
      status: "critical",
    },
    id: nodeIds.emergencySurgery,
    position: { x: 350, y: -50 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Physical therapy, NSAIDs, rest, and activity modification for 6 weeks.",
      handles: { source: true, target: true },
      label: "Conservative Treatment",
      status: "pending",
    },
    id: nodeIds.conservative,
    position: { x: 700, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Have symptoms significantly improved after 6 weeks of conservative care?",
      handles: { source: true, target: true },
      label: "6-Week Evaluation",
      status: "pending",
    },
    id: nodeIds.eval6Weeks,
    position: { x: 1050, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Continue core strengthening, ergonomic adjustments, and healthy lifestyle.",
      handles: { source: false, target: true },
      label: "Maintenance & Prevention",
      status: "success",
    },
    id: nodeIds.maintenance,
    position: { x: 1050, y: -50 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Magnetic Resonance Imaging to confirm Herniated Disc and nerve compression.",
      handles: { source: true, target: true },
      label: "MRI Scan",
      status: "pending",
    },
    id: nodeIds.mri,
    position: { x: 1400, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Epidural Steroid Injection (ESI) to reduce nerve inflammation and pain.",
      handles: { source: true, target: true },
      label: "Targeted Injection",
      status: "pending",
    },
    id: nodeIds.injection,
    position: { x: 1750, y: 0 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Minimally invasive removal of the herniated disc portion pressing on the nerve.",
      handles: { source: false, target: true },
      label: "Microdiscectomy Surgery",
      status: "critical",
    },
    id: nodeIds.microdiscectomy,
    position: { x: 1750, y: 300 },
    type: "pathwayNode",
  },
];

const initialEdges = [
  {
    id: "edge-start-redflags",
    source: nodeIds.start,
    target: nodeIds.redFlags,
    type: "animated",
  },
  {
    id: "edge-redflags-emergency",
    source: nodeIds.redFlags,
    target: nodeIds.emergencySurgery,
    type: "temporary",
    label: "Yes",
    labelStyle: { fill: "#ef4444", fontWeight: 700 },
  },
  {
    id: "edge-redflags-conservative",
    source: nodeIds.redFlags,
    target: nodeIds.conservative,
    type: "animated",
    label: "No",
  },
  {
    id: "edge-conservative-eval",
    source: nodeIds.conservative,
    target: nodeIds.eval6Weeks,
    type: "animated",
  },
  {
    id: "edge-eval-improved",
    source: nodeIds.eval6Weeks,
    target: nodeIds.maintenance,
    type: "animated",
    label: "Yes",
    labelStyle: { fill: "#10b981", fontWeight: 700 },
  },
  {
    id: "edge-eval-mri",
    source: nodeIds.eval6Weeks,
    target: nodeIds.mri,
    type: "animated",
    label: "No / Worsening",
    labelStyle: { fill: "#f59e0b", fontWeight: 700 },
  },
  {
    id: "edge-mri-injection",
    source: nodeIds.mri,
    target: nodeIds.injection,
    type: "animated",
  },
  {
    id: "edge-mri-surgery",
    source: nodeIds.mri,
    target: nodeIds.microdiscectomy,
    type: "temporary",
  },
  {
    id: "edge-injection-success",
    source: nodeIds.injection,
    target: nodeIds.maintenance,
    type: "animated",
    label: "Success",
    labelStyle: { fill: "#10b981", fontWeight: 700 },
  },
  {
    id: "edge-injection-fail",
    source: nodeIds.injection,
    target: nodeIds.microdiscectomy,
    type: "temporary",
    label: "No Relief",
    labelStyle: { fill: "#f59e0b", fontWeight: 700 },
  },
];

const nodeTypes = {
  pathwayNode: ({
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

    if (data.status === "success") {
      statusColor = "bg-emerald-50 border-emerald-200 shadow-sm";
      badgeColor = "bg-emerald-100 text-emerald-700";
    } else if (data.status === "active") {
      statusColor = "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20";
      badgeColor = "bg-blue-100 text-blue-700";
    } else if (data.status === "critical") {
      statusColor = "bg-red-50 border-red-200 shadow-md ring-1 ring-red-500/20";
      badgeColor = "bg-red-100 text-red-700";
    }

    return (
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-72`}>
        <NodeHeader className="pb-2">
          <div className="flex justify-between items-center w-full gap-2">
            <NodeTitle className="text-base font-semibold text-slate-800 leading-tight">{data.label}</NodeTitle>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider whitespace-nowrap ${badgeColor}`}>
              {data.status}
            </span>
          </div>
        </NodeHeader>
        <NodeContent>
          <p className="text-xs text-slate-600 leading-relaxed">{data.description}</p>
        </NodeContent>
      </Node>
    );
  },
};

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

function CanvasWithControls() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
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
      onNodesChange={(changes: NodeChange<any>[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
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

export default function SpineCarePathwayPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Spine Care Decision Pathway</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive treatment map for Sciatica & Herniated Discs</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
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
