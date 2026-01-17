
'use client';

import { useEffect, useState } from "react";
import { onAuthStateChange, signInWithGoogle, logOut } from "@/src/lib/firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
