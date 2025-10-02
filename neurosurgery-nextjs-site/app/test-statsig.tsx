'use client';

import { useStatsigClient } from "@statsig/react-bindings";

export default function TestStatsig() {
  const { client } = useStatsigClient();

  const handleCustomEvent = () => {
    client?.logEvent("my_custom_event", "test_click", {
      timestamp: new Date().toISOString(),
      page: "home",
      location: "hyderabad"
    });
    console.log("Custom event logged to Statsig!");
  };

  const handleAppointmentEvent = () => {
    client?.logEvent("appointment_booking", "test_booking", {
      source: "test_button",
      service_type: "consultation",
      timestamp: new Date().toISOString(),
      location: "hyderabad"
    });
    console.log("Appointment booking event logged to Statsig!");
  };

  const handleServiceInquiry = () => {
    client?.logEvent("service_inquiry", "test_inquiry", {
      service_name: "endoscopic-spine-surgery",
      inquiry_type: "test_inquiry",
      timestamp: new Date().toISOString(),
      location: "hyderabad"
    });
    console.log("Service inquiry event logged to Statsig!");
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Statsig Test Panel</h2>
      <p className="mb-4 text-gray-600">Test your Statsig integration with these buttons:</p>
      
      <div className="space-y-4">
        <button 
          onClick={handleCustomEvent}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
        >
          Test Custom Event
        </button>
        
        <button 
          onClick={handleAppointmentEvent}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mr-4"
        >
          Test Appointment Booking
        </button>
        
        <button 
          onClick={handleServiceInquiry}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors mr-4"
        >
          Test Service Inquiry
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Click any button to send a test event to Statsig</li>
          <li>Check your browser console for confirmation messages</li>
          <li>View events in your Statsig dashboard</li>
          <li>Check session replay for user interactions</li>
        </ol>
      </div>
    </div>
  );
}
