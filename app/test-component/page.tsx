"use client";
import AIStreamingChat from "@/app/_components/AIStreamingChat";

export default function TestPage() {
  return (
    <div className="p-8 h-screen w-full">
      <h1 className="text-2xl mb-4">Chat Component Test</h1>
      <div className="h-[700px] w-[800px]">
        <AIStreamingChat pageSlug="test-page" service="test" />
      </div>
    </div>
  );
}