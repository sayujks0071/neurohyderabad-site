"use client";

import { Canvas } from "@/src/components/ai-elements/canvas";
import { Edge } from "@/src/components/ai-elements/edge";
import {
  Node,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/src/components/ai-elements/node";
import React, { useEffect } from "react";
import { useReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeIds = {
  consultation: "node-consultation",
  diagnostics: "node-diagnostics",
  conservative: "node-conservative",
  surgery: "node-minimally-invasive",
  recovery: "node-recovery",
  rehab: "node-rehab",
};

const nodes = [
  {
    data: {
      description: "Initial clinical evaluation with Dr. Sayuj for spine symptoms.",
      handles: { source: true, target: false },
      label: "Initial Consultation",
      status: "completed",
    },
    id: nodeIds.consultation,
    position: { x: 0, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "MRI or X-Ray imaging to identify structural issues like herniated discs or stenosis.",
      handles: { source: true, target: true },
      label: "Diagnostic Imaging",
      status: "completed",
    },
    id: nodeIds.diagnostics,
    position: { x: 400, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Physical therapy, medication, and epidural injections.",
      handles: { source: true, target: true },
      label: "Conservative Treatment",
      status: "active",
    },
    id: nodeIds.conservative,
    position: { x: 800, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Endoscopic Spine Surgery for targeted decompression or discectomy.",
      handles: { source: true, target: true },
      label: "Minimally Invasive Surgery",
      status: "pending",
    },
    id: nodeIds.surgery,
    position: { x: 800, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Post-operative care and regular check-ins with Dr. Sayuj.",
      handles: { source: true, target: true },
      label: "Recovery & Follow-up",
      status: "pending",
    },
    id: nodeIds.recovery,
    position: { x: 1250, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Long-term core strengthening and posture correction.",
      handles: { source: false, target: true },
      label: "Rehabilitation",
      status: "pending",
    },
    id: nodeIds.rehab,
    position: { x: 1700, y: 0 },
    type: "medicalWorkflow",
  },
];

const edges = [
  {
    id: "edge-consult-diagnostics",
    source: nodeIds.consultation,
    target: nodeIds.diagnostics,
    type: "animated",
  },
  {
    id: "edge-diagnostics-conservative",
    source: nodeIds.diagnostics,
    target: nodeIds.conservative,
    type: "animated",
    label: "Mild Symptoms",
  },
  {
    id: "edge-diagnostics-surgery",
    source: nodeIds.diagnostics,
    target: nodeIds.surgery,
    type: "temporary",
    label: "Red Flags / Severe",
  },
  {
    id: "edge-conservative-surgery",
    source: nodeIds.conservative,
    target: nodeIds.surgery,
    type: "temporary",
    label: "Failed Conservative",
  },
  {
    id: "edge-surgery-recovery",
    source: nodeIds.surgery,
    target: nodeIds.recovery,
    type: "animated",
  },
  {
    id: "edge-conservative-rehab",
    source: nodeIds.conservative,
    target: nodeIds.rehab,
    type: "animated",
  },
  {
    id: "edge-recovery-rehab",
    source: nodeIds.recovery,
    target: nodeIds.rehab,
    type: "animated",
  },
];

const nodeTypes = {
  medicalWorkflow: ({
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
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-72`}>
        <NodeHeader className="pb-2">
          <div className="flex justify-between items-start w-full gap-2">
            <NodeTitle className="text-base font-semibold text-slate-800 leading-tight">{data.label}</NodeTitle>
          </div>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-slate-600 leading-relaxed">{data.description}</p>
        </NodeContent>
        <NodeFooter>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
        </NodeFooter>
      </Node>
    );
  },
};

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

function CanvasWithControls() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    // Small delay to ensure everything is rendered before fitting
    const timer = setTimeout(() => {
      window.requestAnimationFrame(() => {
        fitView({ padding: 0.2, duration: 800 });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return (
    <Canvas
      edges={edges}
      edgeTypes={edgeTypes}
      nodes={nodes}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.2}
      maxZoom={1.5}
      className="opacity-100 transition-opacity duration-500"
    />
  );
}

export default function AIWorkflowPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Spine Care Pathway</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive visualization of Dr. Sayuj's patient journey</p>
          </div>
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
