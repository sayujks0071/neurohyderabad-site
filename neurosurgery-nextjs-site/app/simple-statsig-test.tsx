'use client';

import { useStatsigClient } from "@statsig/react-bindings";

export default function SimpleStatsigTest() {
  const { client } = useStatsigClient();

  const handleClick = () => {
    client?.logEvent("my_custom_event", "test_click", {
      timestamp: new Date().toISOString(),
      page: "home",
      location: "hyderabad"
    });
    console.log("Custom event logged to Statsig!");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4 text-center">
      <h3 className="text-lg font-semibold mb-2">Statsig Test</h3>
      <button 
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Click Me
      </button>
      <p className="text-sm text-gray-600 mt-2">Check console for event confirmation</p>
    </div>
  );
}
