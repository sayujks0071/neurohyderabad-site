'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  BarChart3,
  Database,
  Zap,
  Users
} from 'lucide-react';

interface BotMetrics {
  totalFiles: number;
  totalSize: number;
  lastActivity: string;
  filesToday: number;
  averageFileSize: number;
  healthStatus: 'healthy' | 'warning' | 'error';
  uptime: string;
  responseTime: number;
}

interface ContentFile {
  name: string;
  path: string;
  type: 'content' | 'schema';
  lastModified: string;
  size: number;
}

interface BotActivity {
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'warning';
  details: string;
}

export default function MonitorPage() {
  const [metrics, setMetrics] = useState<BotMetrics | null>(null);
  const [recentFiles, setRecentFiles] = useState<ContentFile[]>([]);
  const [activityLog, setActivityLog] = useState<BotActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch metrics
      const metricsResponse = await fetch('/api/monitor/metrics');
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);

      // Fetch recent files
      const filesResponse = await fetch('/api/drafts/list');
      const filesData = await filesResponse.json();
      setRecentFiles(filesData.drafts.slice(0, 10));

      // Fetch activity log
      const activityResponse = await fetch('/api/monitor/activity');
      const activityData = await activityResponse.json();
      setActivityLog(activityData.logs.slice(0, 20));

      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'error': return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Telegram SEO Bot Monitor</h1>
              <p className="text-gray-600 mt-1">Real-time monitoring of bot activity and content generation</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {formatRelativeTime(lastRefresh.toISOString())}
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-full ${getStatusColor(metrics?.healthStatus || 'healthy')}`}>
                  {getStatusIcon(metrics?.healthStatus || 'healthy')}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Bot Status</p>
                <p className="text-2xl font-semibold text-gray-900 capitalize">
                  {metrics?.healthStatus || 'Healthy'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Files</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {metrics?.totalFiles || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Database className="w-5 h-5" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Size</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatFileSize(metrics?.totalSize || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Last Activity</p>
                <p className="text-sm font-semibold text-gray-900">
                  {metrics?.lastActivity ? formatRelativeTime(metrics.lastActivity) : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Files */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Content Files</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentFiles.length > 0 ? (
                recentFiles.map((file, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          file.type === 'content' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {file.type === 'content' ? <FileText className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{formatRelativeTime(file.lastModified)}</p>
                        <p className="text-xs text-gray-400">{formatDate(file.lastModified)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No files found
                </div>
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Activity Log</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {activityLog.length > 0 ? (
                activityLog.map((activity, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {activity.status === 'success' ? <CheckCircle className="w-3 h-3" /> :
                         activity.status === 'error' ? <AlertTriangle className="w-3 h-3" /> :
                         <AlertTriangle className="w-3 h-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No activity logged
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {metrics && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 text-blue-600 rounded-full">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Files Today</p>
                  <p className="text-2xl font-semibold text-gray-900">{metrics.filesToday}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 text-green-600 rounded-full">
                    <Database className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Average File Size</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatFileSize(metrics.averageFileSize)}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-purple-100 text-purple-600 rounded-full">
                    <Zap className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Response Time</p>
                  <p className="text-2xl font-semibold text-gray-900">{metrics.responseTime}ms</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}