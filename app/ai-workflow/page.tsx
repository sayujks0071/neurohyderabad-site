"use client";

import { Canvas } from "@/src/components/ai-elements/canvas";
import { Edge } from "@/src/components/ai-elements/edge";
import {
  Node,
  NodeContent,
  NodeFooter,
  NodeHeader,
  NodeTitle,
  NodeDescription,
} from "@/src/components/ai-elements/node";
import React, { useEffect } from "react";
import { useReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeIds = {
  booking: "booking-node",
  aiTriage: "ai-triage-node",
  teleconsult: "teleconsult-node",
  inPerson: "in-person-node",
  diagnostics: "diagnostics-node",
  mriAnalysis: "mri-analysis-node",
  conservative: "conservative-node",
  surgical: "surgical-node",
  followUp: "followup-node",
};

const nodes = [
  {
    data: {
      description: "Patient initiates appointment booking online.",
      handles: { source: true, target: false },
      label: "Patient Booking",
      type: "patient-action",
    },
    id: nodeIds.booking,
    position: { x: 0, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "AI Agent collects preliminary symptoms, pain scores, and medical history.",
      handles: { source: true, target: true },
      label: "AI Triage & Intake",
      type: "ai-agent",
    },
    id: nodeIds.aiTriage,
    position: { x: 350, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "For mild symptoms or second opinions, doctor conducts a video call.",
      handles: { source: true, target: true },
      label: "Teleconsultation",
      type: "clinical-decision",
    },
    id: nodeIds.teleconsult,
    position: { x: 700, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "For severe pain or red flags, an immediate in-clinic visit is scheduled.",
      handles: { source: true, target: true },
      label: "In-Person Visit",
      type: "clinical-decision",
    },
    id: nodeIds.inPerson,
    position: { x: 700, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Doctor requests MRI or X-Rays for detailed anatomical review.",
      handles: { source: true, target: true },
      label: "Order Diagnostics",
      type: "clinical-decision",
    },
    id: nodeIds.diagnostics,
    position: { x: 1050, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "AI analyzes uploaded MRI/DICOM images to highlight potential disc bulges or stenosis.",
      handles: { source: true, target: true },
      label: "AI MRI Pre-Analysis",
      type: "ai-agent",
    },
    id: nodeIds.mriAnalysis,
    position: { x: 1400, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "No structural emergencies. Recommend physiotherapy and medication.",
      handles: { source: true, target: true },
      label: "Conservative Plan",
      type: "clinical-decision",
    },
    id: nodeIds.conservative,
    position: { x: 1750, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Significant nerve compression. Recommend Endoscopic Spine Surgery.",
      handles: { source: true, target: true },
      label: "Surgical Plan",
      type: "clinical-decision",
    },
    id: nodeIds.surgical,
    position: { x: 1750, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "AI bot automatically follows up on patient recovery progress after 2 weeks.",
      handles: { source: false, target: true },
      label: "Automated Follow-Up",
      type: "ai-agent",
    },
    id: nodeIds.followUp,
    position: { x: 2100, y: 0 },
    type: "medicalWorkflow",
  },
];

const edges = [
  {
    id: "edge-1",
    source: nodeIds.booking,
    target: nodeIds.aiTriage,
    type: "animated",
  },
  {
    id: "edge-2",
    source: nodeIds.aiTriage,
    target: nodeIds.teleconsult,
    type: "temporary",
    label: "Low Urgency",
  },
  {
    id: "edge-3",
    source: nodeIds.aiTriage,
    target: nodeIds.inPerson,
    type: "animated",
    label: "High Urgency",
  },
  {
    id: "edge-4",
    source: nodeIds.teleconsult,
    target: nodeIds.diagnostics,
    type: "animated",
  },
  {
    id: "edge-5",
    source: nodeIds.inPerson,
    target: nodeIds.diagnostics,
    type: "animated",
  },
  {
    id: "edge-6",
    source: nodeIds.diagnostics,
    target: nodeIds.mriAnalysis,
    type: "animated",
  },
  {
    id: "edge-7",
    source: nodeIds.mriAnalysis,
    target: nodeIds.conservative,
    type: "temporary",
    label: "Mild Issues",
  },
  {
    id: "edge-8",
    source: nodeIds.mriAnalysis,
    target: nodeIds.surgical,
    type: "animated",
    label: "Severe Compression",
  },
  {
    id: "edge-9",
    source: nodeIds.conservative,
    target: nodeIds.followUp,
    type: "animated",
  },
  {
    id: "edge-10",
    source: nodeIds.surgical,
    target: nodeIds.followUp,
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
      type: string;
    };
  }) => {
    let statusColor = "bg-white border-slate-200";
    let badgeColor = "bg-slate-100 text-slate-600";
    let badgeText = "Default";

    if (data.type === "patient-action") {
      statusColor = "bg-emerald-50 border-emerald-200";
      badgeColor = "bg-emerald-100 text-emerald-700";
      badgeText = "Patient Action";
    } else if (data.type === "ai-agent") {
      statusColor = "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20";
      badgeColor = "bg-blue-100 text-blue-700";
      badgeText = "AI Agent";
    } else if (data.type === "clinical-decision") {
      statusColor = "bg-amber-50 border-amber-200";
      badgeColor = "bg-amber-100 text-amber-700";
      badgeText = "Clinical Decision";
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
            {badgeText}
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
            <h1 className="text-2xl font-bold text-slate-900">Dr. Sayuj&apos;s AI-Assisted Clinical Pathway</h1>
            <p className="text-sm text-slate-500 mt-1">An interactive visualization of the modern patient journey from booking to recovery</p>
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
