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
import { useReactFlow, ReactFlowProvider, Panel, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Stethoscope,
  AlertTriangle,
  Pill,
  Activity,
  Bone,
  Syringe,
  ClipboardList,
  CalendarCheck,
  FileSearch,
  CheckCircle2,
  Crosshair
} from "lucide-react";

const nodeIds = {
  presentation: "node-presentation",
  clinicalExam: "node-clinical-exam",
  redFlags: "node-red-flags",
  emergencyMri: "node-emergency-mri",
  emergencySurgery: "node-emergency-surgery",
  conservative: "node-conservative",
  reassess: "node-reassess",
  electiveMri: "node-elective-mri",
  mriReview: "node-mri-review",
  painManagement: "node-pain-management",
  surgicalConsult: "node-surgical-consult",
};

const nodes = [
  {
    data: {
      label: "Patient Presentation",
      description: "Back pain, sciatica, numbness, or weakness reported.",
      icon: "clipboard",
      status: "neutral",
      handles: { source: true, target: false },
    },
    id: nodeIds.presentation,
    position: { x: 0, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Clinical Assessment",
      description: "Detailed neurological and physical examination.",
      icon: "stethoscope",
      status: "neutral",
      handles: { source: true, target: true },
    },
    id: nodeIds.clinicalExam,
    position: { x: 350, y: 0 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Red Flag Screening",
      description: "Check for Cauda Equina, severe progressive weakness, or infection.",
      icon: "alert",
      status: "warning",
      handles: { source: true, target: true },
    },
    id: nodeIds.redFlags,
    position: { x: 700, y: -150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Urgent MRI",
      description: "Immediate diagnostic imaging required.",
      icon: "search",
      status: "critical",
      handles: { source: true, target: true },
    },
    id: nodeIds.emergencyMri,
    position: { x: 1050, y: -250 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Emergency Surgery",
      description: "Decompression surgery to prevent permanent damage.",
      icon: "crosshair",
      status: "critical",
      handles: { source: false, target: true },
    },
    id: nodeIds.emergencySurgery,
    position: { x: 1400, y: -250 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Conservative Treatment",
      description: "Physical therapy, NSAIDs, rest, and activity modification.",
      icon: "pill",
      status: "active",
      handles: { source: true, target: true },
    },
    id: nodeIds.conservative,
    position: { x: 700, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "6-Week Reassessment",
      description: "Evaluate progress and symptom relief.",
      icon: "calendar",
      status: "active",
      handles: { source: true, target: true },
    },
    id: nodeIds.reassess,
    position: { x: 1050, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Elective MRI",
      description: "Imaging for persistent or worsening symptoms.",
      icon: "search",
      status: "neutral",
      handles: { source: true, target: true },
    },
    id: nodeIds.electiveMri,
    position: { x: 1400, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Surgical Case Review",
      description: "Analyze MRI for structural lesions (e.g., herniated disc).",
      icon: "bone",
      status: "neutral",
      handles: { source: true, target: true },
    },
    id: nodeIds.mriReview,
    position: { x: 1750, y: 150 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Pain Management",
      description: "Epidural injections and advanced non-surgical care.",
      icon: "syringe",
      status: "success",
      handles: { source: false, target: true },
    },
    id: nodeIds.painManagement,
    position: { x: 2150, y: 50 },
    type: "medicalWorkflow",
  },
  {
    data: {
      label: "Surgical Consultation",
      description: "Discuss minimally invasive spine surgery options.",
      icon: "crosshair",
      status: "active",
      handles: { source: false, target: true },
    },
    id: nodeIds.surgicalConsult,
    position: { x: 2150, y: 250 },
    type: "medicalWorkflow",
  },
];

const edges = [
  { id: "e-pres-exam", source: nodeIds.presentation, target: nodeIds.clinicalExam, type: "animated" },
  { id: "e-exam-red", source: nodeIds.clinicalExam, target: nodeIds.redFlags, type: "animated" },
  { id: "e-exam-cons", source: nodeIds.clinicalExam, target: nodeIds.conservative, type: "animated" },
  { id: "e-red-emri", source: nodeIds.redFlags, target: nodeIds.emergencyMri, type: "animated", label: "Red flags present" },
  { id: "e-emri-esurg", source: nodeIds.emergencyMri, target: nodeIds.emergencySurgery, type: "animated" },
  { id: "e-cons-reassess", source: nodeIds.conservative, target: nodeIds.reassess, type: "temporary" },
  { id: "e-reassess-mri", source: nodeIds.reassess, target: nodeIds.electiveMri, type: "animated", label: "No improvement" },
  { id: "e-mri-review", source: nodeIds.electiveMri, target: nodeIds.mriReview, type: "animated" },
  { id: "e-review-pain", source: nodeIds.mriReview, target: nodeIds.painManagement, type: "temporary", label: "No clear structural lesion" },
  { id: "e-review-surg", source: nodeIds.mriReview, target: nodeIds.surgicalConsult, type: "animated", label: "Structural lesion found" },
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
      icon: string;
    };
  }) => {
    let statusClasses = "bg-white border-slate-200";
    let badgeClasses = "bg-slate-100 text-slate-600";
    let IconComponent = Activity;

    switch (data.icon) {
      case "clipboard": IconComponent = ClipboardList; break;
      case "stethoscope": IconComponent = Stethoscope; break;
      case "alert": IconComponent = AlertTriangle; break;
      case "search": IconComponent = FileSearch; break;
      case "pill": IconComponent = Pill; break;
      case "calendar": IconComponent = CalendarCheck; break;
      case "bone": IconComponent = Bone; break;
      case "syringe": IconComponent = Syringe; break;
      case "crosshair": IconComponent = Crosshair; break;
      case "success": IconComponent = CheckCircle2; break;
    }

    if (data.status === "warning") {
      statusClasses = "bg-amber-50 border-amber-200 shadow-sm ring-1 ring-amber-500/10";
      badgeClasses = "bg-amber-100 text-amber-700";
    } else if (data.status === "critical") {
      statusClasses = "bg-red-50 border-red-200 shadow-md ring-1 ring-red-500/20";
      badgeClasses = "bg-red-100 text-red-700";
    } else if (data.status === "active") {
      statusClasses = "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-500/20";
      badgeClasses = "bg-blue-100 text-blue-700";
    } else if (data.status === "success") {
      statusClasses = "bg-emerald-50 border-emerald-200";
      badgeClasses = "bg-emerald-100 text-emerald-700";
    }

    return (
      <Node handles={data.handles} className={`${statusClasses} transition-all duration-300 w-80`}>
        <NodeHeader className="pb-3 pt-4 px-4 bg-transparent border-b-0">
          <div className="flex items-center gap-3 w-full">
            <div className={`p-2 rounded-lg ${badgeClasses}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <NodeTitle className="text-base font-semibold text-slate-800 leading-tight">
              {data.label}
            </NodeTitle>
          </div>
        </NodeHeader>
        <NodeContent className="px-4 pb-2 pt-0">
          <p className="text-sm text-slate-600 leading-relaxed">{data.description}</p>
        </NodeContent>
        <NodeFooter className="px-4 py-3 bg-slate-50/50 border-t border-slate-100">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeClasses}`}>
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)} Phase
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
    >
      <Panel position="top-right" className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 w-64">
        <h3 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Legend</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-xs text-slate-600 font-medium">Evaluation / Review</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600 font-medium">Warning / Red Flags</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            <span className="text-xs text-slate-600 font-medium">Critical Action Required</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-600 font-medium">Active Treatment</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600 font-medium">Successful Outcome</span>
          </div>
        </div>
      </Panel>
      <Controls className="bg-white shadow-lg border-slate-200 fill-slate-600" />
      <MiniMap
        className="bg-slate-50 border-slate-200 shadow-md rounded-lg overflow-hidden"
        nodeColor={(node) => {
          const status = (node.data as any).status;
          switch (status) {
            case 'warning': return '#f59e0b';
            case 'critical': return '#ef4444';
            case 'active': return '#3b82f6';
            case 'success': return '#10b981';
            default: return '#94a3b8';
          }
        }}
        maskColor="rgba(248, 250, 252, 0.7)"
      />
    </Canvas>
  );
}

export default function AIWorkflowPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Spine Surgery Decision Tree</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive patient care pathway for structural spinal conditions</p>
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
