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
import { useReactFlow, ReactFlowProvider, Panel, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Bot, Scan, Pill, Video, Building2, ClipboardList, BrainCircuit } from "lucide-react";

const nodeIds = {
  symptoms: "node-symptoms",
  aiAnalysis: "node-ai-analysis",
  mriRequired: "node-mri-required",
  conservative: "node-conservative",
  surgeryReview: "node-surgery-review",
  teleconsult: "node-teleconsult",
  inPerson: "node-in-person",
};

const nodes = [
  {
    data: {
      description: "Patient inputs symptoms (e.g., severe back pain, sciatica).",
      handles: { source: true, target: false },
      label: "Symptom Logging",
      status: "completed",
      icon: ClipboardList,
      metrics: { "Urgency": "Variable" },
    },
    id: nodeIds.symptoms,
    position: { x: 0, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "AI triage evaluates urgency and condition likelihood.",
      handles: { source: true, target: true },
      label: "AI Triage Analysis",
      status: "active",
      icon: Bot,
      metrics: { "AI Confidence": "98%", "Processing Time": "<1s" },
    },
    id: nodeIds.aiAnalysis,
    position: { x: 400, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Red flags detected. AI suggests immediate scan.",
      handles: { source: true, target: true },
      label: "Diagnostic Imaging (MRI)",
      status: "pending",
      icon: Scan,
      metrics: { "Action Required": "Schedule MRI" },
    },
    id: nodeIds.mriRequired,
    position: { x: 800, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Mild symptoms. Recommend physical therapy & meds.",
      handles: { source: true, target: true },
      label: "Conservative Treatment",
      status: "pending",
      icon: Pill,
      metrics: { "Action Required": "Physiotherapy" },
    },
    id: nodeIds.conservative,
    position: { x: 800, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "AI analyzes MRI. Flags structural abnormalities for Dr. Sayuj.",
      handles: { source: true, target: true },
      label: "Surgical Case Review",
      status: "pending",
      icon: BrainCircuit,
      metrics: { "Urgency": "High", "Action Required": "Review Scans" },
    },
    id: nodeIds.surgeryReview,
    position: { x: 1250, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Schedule online follow-up to review conservative progress.",
      handles: { source: false, target: true },
      label: "Teleconsultation",
      status: "pending",
      icon: Video,
      metrics: { "Action Required": "Schedule Call" },
    },
    id: nodeIds.teleconsult,
    position: { x: 1250, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      description: "Dr. Sayuj confirms surgery plan in-clinic.",
      handles: { source: false, target: true },
      label: "In-Person Consultation",
      status: "pending",
      icon: Building2,
      metrics: { "Action Required": "Book Appointment" },
    },
    id: nodeIds.inPerson,
    position: { x: 1700, y: -150 },
    type: "medicalWorkflow",
  },
];

const edges = [
  {
    id: "edge-symptoms-ai",
    source: nodeIds.symptoms,
    target: nodeIds.aiAnalysis,
    type: "animated",
  },
  {
    id: "edge-ai-mri",
    source: nodeIds.aiAnalysis,
    target: nodeIds.mriRequired,
    type: "animated",
    label: "High Urgency",
  },
  {
    id: "edge-ai-conservative",
    source: nodeIds.aiAnalysis,
    target: nodeIds.conservative,
    type: "temporary",
    label: "Low Urgency",
  },
  {
    id: "edge-mri-surgery",
    source: nodeIds.mriRequired,
    target: nodeIds.surgeryReview,
    type: "animated",
  },
  {
    id: "edge-conservative-tele",
    source: nodeIds.conservative,
    target: nodeIds.teleconsult,
    type: "temporary",
  },
  {
    id: "edge-surgery-inperson",
    source: nodeIds.surgeryReview,
    target: nodeIds.inPerson,
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
      icon?: React.ElementType;
      metrics?: Record<string, string>;
    };
  }) => {
    let statusColor = "bg-white border-slate-200";
    let badgeColor = "bg-slate-100 text-slate-600";
    let iconColor = "text-slate-500";

    if (data.status === "completed") {
      statusColor = "bg-emerald-50 border-emerald-200";
      badgeColor = "bg-emerald-100 text-emerald-700";
      iconColor = "text-emerald-600";
    } else if (data.status === "active") {
      statusColor = "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20";
      badgeColor = "bg-blue-100 text-blue-700";
      iconColor = "text-blue-600";
    }

    const Icon = data.icon;

    return (
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-72`}>
        <NodeHeader className="pb-2">
          <div className="flex justify-between items-start w-full gap-2">
            <div className="flex items-center gap-2">
              {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
              <NodeTitle className="text-base font-semibold text-slate-800 leading-tight">{data.label}</NodeTitle>
            </div>
          </div>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-slate-600 leading-relaxed mb-2">{data.description}</p>
          {data.metrics && (
            <div className="mt-3 flex flex-col gap-1">
              {Object.entries(data.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-xs bg-slate-100/50 px-2 py-1.5 rounded border border-slate-100">
                  <span className="font-medium text-slate-500">{key}</span>
                  <span className="font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          )}
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
      className="opacity-100 transition-opacity duration-500 bg-slate-50"
    >
      <Panel position="top-left" className="bg-white/90 p-4 rounded-lg shadow-sm border border-slate-200 backdrop-blur-sm max-w-xs m-4 z-10">
        <h3 className="font-semibold text-sm mb-3 text-slate-800">Workflow Legend</h3>
        <div className="flex flex-col gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <span className="text-slate-600">Completed Steps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 ring-2 ring-blue-200"></div>
            <span className="text-slate-600">Active AI Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <span className="text-slate-600">Pending Actions</span>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <div className="w-4 h-0.5 bg-slate-400"></div>
            <span className="text-slate-600">Standard Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-slate-300 border-t border-dashed border-slate-400"></div>
            <span className="text-slate-600">Alternative Path</span>
          </div>
        </div>
      </Panel>
      <Controls className="bg-white border-slate-200 shadow-sm rounded-md overflow-hidden" showInteractive={false} />
    </Canvas>
  );
}

export default function AIWorkflowPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Diagnostic Triage & Workflow</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive visualization of our AI-assisted patient intake process</p>
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
