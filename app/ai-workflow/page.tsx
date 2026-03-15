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
import { Activity, AlertTriangle, Scan, Pill, Stethoscope, CheckCircle } from "lucide-react";

const nodeIds = {
  symptoms: "node-symptoms",
  redFlags: "node-red-flags",
  conservative: "node-conservative",
  mri: "node-mri",
  surgery: "node-surgery",
  recovery: "node-recovery",
};

const nodes = [
  {
    data: {
      description: "Patient experiences back pain radiating down the leg.",
      details: "Common indicators include numbness, tingling, or pain that worsens with prolonged sitting.",
      handles: { source: true, target: false },
      label: "Initial Symptoms",
      status: "initial",
    },
    id: nodeIds.symptoms,
    position: { x: 0, y: 0 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Severe weakness, saddle anesthesia, or bowel/bladder issues.",
      details: "These are medical emergencies indicating possible Cauda Equina Syndrome.",
      handles: { source: true, target: true },
      label: "Emergency Red Flags",
      status: "warning",
    },
    id: nodeIds.redFlags,
    position: { x: 0, y: 300 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "6-week course of physical therapy, NSAIDs, and activity modification.",
      details: "Most patients (~80%) experience significant relief without surgery.",
      handles: { source: true, target: true },
      label: "Conservative Care",
      status: "treatment",
    },
    id: nodeIds.conservative,
    position: { x: 500, y: -100 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Detailed imaging to identify nerve compression or herniated discs.",
      details: "Ordered if red flags are present or if symptoms persist after conservative care.",
      handles: { source: true, target: true },
      label: "Diagnostic MRI",
      status: "diagnostic",
    },
    id: nodeIds.mri,
    position: { x: 500, y: 300 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Minimally invasive endoscopic discectomy for nerve decompression.",
      details: "Day-care procedure with rapid recovery and minimal tissue disruption.",
      handles: { source: true, target: true },
      label: "Endoscopic Surgery",
      status: "surgery",
    },
    id: nodeIds.surgery,
    position: { x: 1000, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Return to normal daily activities and work.",
      details: "Typically achieved within weeks after surgery or successful conservative care.",
      handles: { source: false, target: true },
      label: "Full Recovery",
      status: "success",
    },
    id: nodeIds.recovery,
    position: { x: 1500, y: 0 },
    type: "pathwayNode",
  },
];

const edges = [
  {
    id: "edge-symptoms-conservative",
    source: nodeIds.symptoms,
    target: nodeIds.conservative,
    type: "animated",
    label: "No Red Flags",
    style: { strokeWidth: 2 },
    labelStyle: { fill: "#475569", fontWeight: 600 },
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 0.9, stroke: "#e2e8f0" },
  },
  {
    id: "edge-symptoms-redflags",
    source: nodeIds.symptoms,
    target: nodeIds.redFlags,
    type: "temporary",
    label: "Severe Symptoms",
    style: { strokeWidth: 2, stroke: "#ef4444" },
    labelStyle: { fill: "#ef4444", fontWeight: 600 },
    labelBgStyle: { fill: "#fef2f2", fillOpacity: 0.9, stroke: "#fca5a5" },
  },
  {
    id: "edge-conservative-recovery",
    source: nodeIds.conservative,
    target: nodeIds.recovery,
    type: "animated",
    label: "Symptoms Resolve",
    style: { strokeWidth: 2, stroke: "#10b981" },
    labelStyle: { fill: "#10b981", fontWeight: 600 },
    labelBgStyle: { fill: "#ecfdf5", fillOpacity: 0.9, stroke: "#a7f3d0" },
  },
  {
    id: "edge-conservative-mri",
    source: nodeIds.conservative,
    target: nodeIds.mri,
    type: "animated",
    label: "Fails 6 Weeks Therapy",
    style: { strokeWidth: 2 },
    labelStyle: { fill: "#475569", fontWeight: 600 },
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 0.9, stroke: "#e2e8f0" },
  },
  {
    id: "edge-redflags-mri",
    source: nodeIds.redFlags,
    target: nodeIds.mri,
    type: "animated",
    label: "Immediate Scan",
    style: { strokeWidth: 2, stroke: "#f59e0b" },
    labelStyle: { fill: "#d97706", fontWeight: 600 },
    labelBgStyle: { fill: "#fffbeb", fillOpacity: 0.9, stroke: "#fde68a" },
  },
  {
    id: "edge-mri-surgery",
    source: nodeIds.mri,
    target: nodeIds.surgery,
    type: "animated",
    label: "Surgical Lesion Found",
    style: { strokeWidth: 2 },
    labelStyle: { fill: "#475569", fontWeight: 600 },
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 0.9, stroke: "#e2e8f0" },
  },
  {
    id: "edge-surgery-recovery",
    source: nodeIds.surgery,
    target: nodeIds.recovery,
    type: "animated",
    label: "Post-op Rehab",
    style: { strokeWidth: 2, stroke: "#10b981" },
    labelStyle: { fill: "#10b981", fontWeight: 600 },
    labelBgStyle: { fill: "#ecfdf5", fillOpacity: 0.9, stroke: "#a7f3d0" },
  },
];

const nodeTypes = {
  pathwayNode: ({
    data,
  }: {
    data: {
      label: string;
      description: string;
      details?: string;
      handles: { target: boolean; source: boolean };
      status: "initial" | "warning" | "treatment" | "diagnostic" | "surgery" | "success";
    };
  }) => {
    let statusColor = "bg-white border-slate-200";
    let badgeColor = "bg-slate-100 text-slate-600";
    let Icon = Activity;

    switch (data.status) {
      case "initial":
        statusColor = "bg-blue-50/80 border-blue-200 shadow-sm";
        badgeColor = "bg-blue-100 text-blue-700";
        Icon = Activity;
        break;
      case "warning":
        statusColor = "bg-red-50/80 border-red-200 shadow-md ring-1 ring-red-500/30";
        badgeColor = "bg-red-100 text-red-700";
        Icon = AlertTriangle;
        break;
      case "treatment":
        statusColor = "bg-indigo-50/80 border-indigo-200 shadow-sm";
        badgeColor = "bg-indigo-100 text-indigo-700";
        Icon = Pill;
        break;
      case "diagnostic":
        statusColor = "bg-amber-50/80 border-amber-200 shadow-sm";
        badgeColor = "bg-amber-100 text-amber-700";
        Icon = Scan;
        break;
      case "surgery":
        statusColor = "bg-purple-50/80 border-purple-200 shadow-md";
        badgeColor = "bg-purple-100 text-purple-700";
        Icon = Stethoscope;
        break;
      case "success":
        statusColor = "bg-emerald-50/80 border-emerald-200 shadow-sm ring-1 ring-emerald-500/20";
        badgeColor = "bg-emerald-100 text-emerald-700";
        Icon = CheckCircle;
        break;
    }

    return (
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-[340px] hover:-translate-y-1 hover:shadow-xl`}>
        <NodeHeader className="pb-3 bg-transparent border-b-0">
          <div className="flex justify-between items-start w-full gap-3">
            <div className={`p-2.5 rounded-xl ${badgeColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <NodeTitle className="text-[17px] font-bold text-slate-800 leading-tight flex-1 pt-1.5">{data.label}</NodeTitle>
          </div>
        </NodeHeader>
        <NodeContent className="pt-0 pb-4">
          <NodeDescription className="text-sm text-slate-700 leading-relaxed font-medium">
            {data.description}
          </NodeDescription>
          {data.details && (
            <p className="text-[13px] text-slate-500 mt-3 pt-3 border-t border-slate-200/60 leading-relaxed">
              {data.details}
            </p>
          )}
        </NodeContent>
        <NodeFooter className="bg-transparent border-t-0 pt-0 pb-4">
          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${badgeColor} border border-current/10 tracking-wide uppercase`}>
            {data.status}
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
    }, 150);
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm py-5 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sciatica & Slip Disc Treatment Pathway</h1>
            <p className="text-base text-slate-600 mt-1.5 font-medium">
              Interactive clinical decision tree for managing lower back and leg pain.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Dr. Sayuj Krishnan - Neurosurgeon</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative h-[calc(100vh-100px)]">
        <div className="absolute inset-0 bg-slate-50/50">
          <ReactFlowProvider>
            <CanvasWithControls />
          </ReactFlowProvider>
        </div>
      </main>
    </div>
  );
}
