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
import { ArrowLeft, Activity, Brain, Microscope, Stethoscope, Crosshair, RadioTower, Pill, ShieldCheck, FileSearch } from "lucide-react";
import { useReactFlow, ReactFlowProvider, applyNodeChanges, NodeChange } from "@xyflow/react";

const nodeIds = {
  symptoms: "symptoms",
  neuroExam: "neuro-exam",
  mriScans: "mri-scans",
  biopsy: "biopsy",
  tumorBoard: "tumor-board",
  surgery: "surgery",
  radiation: "radiation",
  chemo: "chemo",
  followup: "followup",
};

const initialNodes = [
  {
    data: {
      description: "Headaches, seizures, vision changes, or cognitive decline.",
      handles: { source: true, target: false },
      label: "Initial Symptoms",
      status: "active",
      icon: "activity",
    },
    id: nodeIds.symptoms,
    position: { x: 0, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Comprehensive assessment of motor, sensory, and cognitive functions.",
      handles: { source: true, target: true },
      label: "Neurological Exam",
      status: "pending",
      icon: "stethoscope",
    },
    id: nodeIds.neuroExam,
    position: { x: 350, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Advanced imaging to locate the tumor and determine its size and characteristics.",
      handles: { source: true, target: true },
      label: "MRI & CT Scans",
      status: "pending",
      icon: "filesearch",
    },
    id: nodeIds.mriScans,
    position: { x: 700, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Surgical removal of a small tissue sample for pathological analysis.",
      handles: { source: true, target: true },
      label: "Biopsy & Pathology",
      status: "pending",
      icon: "microscope",
    },
    id: nodeIds.biopsy,
    position: { x: 1050, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Multidisciplinary team reviews pathology and scans to design a tailored treatment plan.",
      handles: { source: true, target: true },
      label: "Tumor Board Review",
      status: "pending",
      icon: "brain",
    },
    id: nodeIds.tumorBoard,
    position: { x: 1400, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Maximal safe resection using advanced neuro-navigation and awake craniotomy techniques.",
      handles: { source: true, target: true },
      label: "Microsurgical Resection",
      status: "critical",
      icon: "crosshair",
    },
    id: nodeIds.surgery,
    position: { x: 1750, y: -50 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Targeted high-dose radiation therapy (e.g., CyberKnife, SRS) to destroy remaining tumor cells.",
      handles: { source: true, target: true },
      label: "Radiation Therapy",
      status: "active",
      icon: "radiotower",
    },
    id: nodeIds.radiation,
    position: { x: 1750, y: 150 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Systemic medications to slow tumor growth, often combined with radiation.",
      handles: { source: true, target: true },
      label: "Chemotherapy",
      status: "active",
      icon: "pill",
    },
    id: nodeIds.chemo,
    position: { x: 1750, y: 350 },
    type: "pathwayNode",
  },
  {
    data: {
      description: "Regular MRI scans and clinical evaluations to monitor recovery and detect recurrence.",
      handles: { source: false, target: true },
      label: "Long-term Surveillance",
      status: "success",
      icon: "shieldcheck",
    },
    id: nodeIds.followup,
    position: { x: 2150, y: 150 },
    type: "pathwayNode",
  },
];

const initialEdges = [
  { id: "e-sym-exam", source: nodeIds.symptoms, target: nodeIds.neuroExam, type: "animated" },
  { id: "e-exam-scan", source: nodeIds.neuroExam, target: nodeIds.mriScans, type: "animated" },
  { id: "e-scan-biopsy", source: nodeIds.mriScans, target: nodeIds.biopsy, type: "animated" },
  { id: "e-biopsy-board", source: nodeIds.biopsy, target: nodeIds.tumorBoard, type: "animated" },
  { id: "e-board-surg", source: nodeIds.tumorBoard, target: nodeIds.surgery, type: "animated", label: "Primary Treatment" },
  { id: "e-board-rad", source: nodeIds.tumorBoard, target: nodeIds.radiation, type: "temporary", label: "If Inoperable" },
  { id: "e-board-chemo", source: nodeIds.tumorBoard, target: nodeIds.chemo, type: "temporary" },
  { id: "e-surg-rad", source: nodeIds.surgery, target: nodeIds.radiation, type: "temporary", label: "Adjuvant Therapy" },
  { id: "e-rad-chemo", source: nodeIds.radiation, target: nodeIds.chemo, type: "temporary" },
  { id: "e-surg-followup", source: nodeIds.surgery, target: nodeIds.followup, type: "animated" },
  { id: "e-rad-followup", source: nodeIds.radiation, target: nodeIds.followup, type: "animated" },
  { id: "e-chemo-followup", source: nodeIds.chemo, target: nodeIds.followup, type: "animated" },
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
      icon: string;
    };
  }) => {
    let statusColor = "bg-white border-slate-200";
    let badgeColor = "bg-slate-100 text-slate-600";
    let IconComponent = Activity;

    switch (data.icon) {
      case "activity": IconComponent = Activity; break;
      case "stethoscope": IconComponent = Stethoscope; break;
      case "filesearch": IconComponent = FileSearch; break;
      case "microscope": IconComponent = Microscope; break;
      case "brain": IconComponent = Brain; break;
      case "crosshair": IconComponent = Crosshair; break;
      case "radiotower": IconComponent = RadioTower; break;
      case "pill": IconComponent = Pill; break;
      case "shieldcheck": IconComponent = ShieldCheck; break;
    }

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
      <Node handles={data.handles} className={`${statusColor} transition-all duration-300 w-80`}>
        <NodeHeader className="pb-3 pt-4 px-4 bg-transparent border-b-0">
          <div className="flex items-center gap-3 w-full">
            <div className={`p-2 rounded-lg ${badgeColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <NodeTitle className="text-base font-semibold text-slate-800 leading-tight">
              {data.label}
            </NodeTitle>
          </div>
        </NodeHeader>
        <NodeContent className="px-4 pb-4 pt-0">
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

export default function BrainTumorPathwayPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Brain Tumor Treatment Pathway</h1>
            <p className="text-sm text-slate-500 mt-1">Interactive roadmap from diagnosis to recovery</p>
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
