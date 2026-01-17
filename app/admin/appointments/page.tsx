'use client';

import { useEffect, useState } from "react";
import { onAuthStateChange, signInWithGoogle, logOut } from "@/src/lib/firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { MessageCircle } from 'lucide-react';
import { generateWhatsappUrl } from './utils';

// Force dynamic rendering to prevent build-time Firebase initialization errors
export const dynamic = 'force-dynamic';

export default function AppointmentsPage() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: any) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const db = getFirestore(getApp());
      getDocs(collection(db, "leads"))
        .then((querySnapshot) => {
          const appointments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAppointments(appointments);
        });
    }
  }, [user]);

  const sendWhatsapp = (appointment: any) => {
    if (!appointment.phone) {
        alert("No phone number available for this patient.");
        return;
    }

    // Map Firestore data to Appointment interface expected by utils
    const url = generateWhatsappUrl({
      id: appointment.id,
      fullName: appointment.fullName || "Patient",
      phone: appointment.phone,
      preferredDate: appointment.preferredDate || "your requested date",
      status: 'Pending'
    });
    window.open(url, '_blank');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={logOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Concern</th>
              <th className="py-2 px-4 border-b">Preferred Date</th>
              <th className="py-2 px-4 border-b">Preferred Time</th>
              <th className="py-2 px-4 border-b">Source</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b">{appointment.fullName}</td>
                <td className="py-2 px-4 border-b">{appointment.email}</td>
                <td className="py-2 px-4 border-b">{appointment.phone}</td>
                <td className="py-2 px-4 border-b">{appointment.concern}</td>
                <td className="py-2 px-4 border-b">{appointment.preferredDate}</td>
                <td className="py-2 px-4 border-b">{appointment.preferredTime}</td>
                <td className="py-2 px-4 border-b">{appointment.source}</td>
                <td className="py-2 px-4 border-b">
                   <button
                    onClick={() => sendWhatsapp(appointment)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                    title="Confirm via WhatsApp"
                   >
                     <MessageCircle size={16} />
                     <span>Confirm</span>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
