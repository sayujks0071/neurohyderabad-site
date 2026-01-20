'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/src/lib/auth';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  appointments: { total: number; pending: number; confirmed: number };
  workflows: { total: number; running: number; failed: number };
  health: { status: string; latency: number };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth.isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // Fetch dashboard stats
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error('Failed to fetch stats:', e);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-blue-600">
                {stats?.appointments.total ?? '—'}
              </p>
              <p className="text-sm text-gray-500">
                {stats?.appointments.pending ?? 0} pending • {stats?.appointments.confirmed ?? 0} confirmed
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Workflows</h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-green-600">
                {stats?.workflows.total ?? '—'}
              </p>
              <p className="text-sm text-gray-500">
                {stats?.workflows.running ?? 0} running • {stats?.workflows.failed ?? 0} failed
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Database Health</h3>
            <div className="mt-2">
              <p className={`text-3xl font-bold ${stats?.health.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                {stats?.health.status ?? 'Unknown'}
              </p>
              <p className="text-sm text-gray-500">
                {stats?.health.latency ?? '—'}ms latency
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/appointments" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">📅 Appointments</h3>
              <p className="mt-2 text-sm text-gray-500">
                View and manage patient appointments
              </p>
            </div>
          </Link>

          <Link href="/admin/patients" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">👥 Patients (CRM)</h3>
              <p className="mt-2 text-sm text-gray-500">
                Patient database and lead management
              </p>
            </div>
          </Link>

          <Link href="/admin/reviews" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">⭐ Reviews</h3>
              <p className="mt-2 text-sm text-gray-500">
                Manage patient testimonials and reviews
              </p>
            </div>
          </Link>

          <Link href="/admin/workflows" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">⚙️ Workflows</h3>
              <p className="mt-2 text-sm text-gray-500">
                Monitor automated workflow runs
              </p>
            </div>
          </Link>

          <Link href="/admin/seo" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">📊 SEO Analytics</h3>
              <p className="mt-2 text-sm text-gray-500">
                Keyword rankings and content performance
              </p>
            </div>
          </Link>

          <Link href="/admin/health" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">🏥 Site Health</h3>
              <p className="mt-2 text-sm text-gray-500">
                Uptime monitoring and performance
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => fetch('/api/workflows/seo', { method: 'POST' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Run SEO Optimization
          </button>
          <button
            onClick={() => fetch('/api/workflows/health', { method: 'POST' })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Run Health Check
          </button>
          <button
            onClick={() => fetch('/api/revalidate', { method: 'POST' })}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Clear Cache
          </button>
        </div>
      </main>
    </div>
  );
}
