import React, { useState, useEffect } from 'react';
import { usePerformanceMonitor } from '../utils/performance';
import { useSystemMonitor } from '../utils/systemMonitor';

const PerformanceDashboard = () => {
  const { getStats, exportData, clear } = usePerformanceMonitor();
  const { startMonitoring, stopMonitoring, getHealth, exportData: exportSystemData, reset: resetSystem } = useSystemMonitor();
  
  const [stats, setStats] = useState(getStats());
  const [systemHealth, setSystemHealth] = useState(getHealth());
  const [isVisible, setIsVisible] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [activeTab, setActiveTab] = useState('performance'); // 'performance' or 'system'

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
      setSystemHealth(getHealth());
    }, 1000);

    return () => clearInterval(interval);
  }, [getStats, getHealth]);

  const handleExport = () => {
    const performanceData = exportData();
    const systemData = exportSystemData();
    
    const combinedData = {
      performance: performanceData,
      system: systemData,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(combinedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `load-test-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    clear();
    resetSystem();
    setStats(getStats());
    setSystemHealth(getHealth());
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
      setIsMonitoring(false);
    } else {
      startMonitoring();
      setIsMonitoring(true);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg z-50"
        title="Performance Dashboard"
      >
        ⏱️
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-96 z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 ${activeTab === 'performance' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 ${activeTab === 'system' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          System Health
        </button>
      </div>

      {activeTab === 'performance' && (
        <div className="space-y-3">
          {/* SRS Compliance */}
          <div className={`p-3 rounded-lg ${stats.meetsSRSRequirement ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">SRS Compliance (95%)</span>
              <span className={`font-bold ${stats.meetsSRSRequirement ? 'text-green-600' : 'text-red-600'}`}>
                {stats.percentage}%
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {stats.meetsSRSRequirement ? '✅ Meeting requirement' : '❌ Below requirement'}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">Total Interactions</div>
              <div className="text-lg font-bold">{stats.totalInteractions}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">Within 2s</div>
              <div className="text-lg font-bold text-green-600">{stats.withinThreshold}</div>
            </div>
          </div>

          {/* Duration Stats */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Average Duration:</span>
              <span className="font-medium">{stats.averageDuration}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Min Duration:</span>
              <span className="font-medium text-green-600">{stats.minDuration}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Max Duration:</span>
              <span className={`font-medium ${parseFloat(stats.maxDuration) > 2000 ? 'text-red-600' : 'text-green-600'}`}>
                {stats.maxDuration}ms
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-3">
          {/* System Health Status */}
          <div className={`p-3 rounded-lg ${
            systemHealth.status === 'healthy' ? 'bg-green-100' : 
            systemHealth.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">System Status</span>
              <span className={`font-bold ${
                systemHealth.status === 'healthy' ? 'text-green-600' : 
                systemHealth.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {systemHealth.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">Memory Usage</div>
              <div className={`text-lg font-bold ${
                systemHealth.metrics.memoryUsage > 80 ? 'text-red-600' : 
                systemHealth.metrics.memoryUsage > 60 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {systemHealth.metrics.memoryUsage.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="font-medium">Active Connections</div>
              <div className={`text-lg font-bold ${
                systemHealth.metrics.connectionCount > 5000 ? 'text-red-600' : 
                systemHealth.metrics.connectionCount > 2000 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {systemHealth.metrics.connectionCount}
              </div>
            </div>
          </div>

          {/* Response Time and Error Rate */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Avg Response Time:</span>
              <span className={`font-medium ${
                systemHealth.metrics.avgResponseTime > 2000 ? 'text-red-600' : 
                systemHealth.metrics.avgResponseTime > 1000 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {systemHealth.metrics.avgResponseTime.toFixed(0)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>Error Rate:</span>
              <span className={`font-medium ${
                systemHealth.metrics.errorRate > 5 ? 'text-red-600' : 
                systemHealth.metrics.errorRate > 2 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {systemHealth.metrics.errorRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="font-medium">
                {Math.floor(systemHealth.metrics.uptime / 1000)}s
              </span>
            </div>
          </div>

          {/* Recommendations */}
          {systemHealth.recommendations.length > 0 && (
            <div className="bg-yellow-50 p-2 rounded text-xs">
              <div className="font-medium text-yellow-800 mb-1">Recommendations:</div>
              <ul className="list-disc list-inside space-y-1">
                {systemHealth.recommendations.map((rec, index) => (
                  <li key={index} className="text-yellow-700">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2 pt-4 border-t">
        <button
          onClick={toggleMonitoring}
          className={`flex-1 py-1 px-3 rounded text-sm ${
            isMonitoring ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
        <button
          onClick={handleExport}
          className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
        >
          Export Data
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-600 text-white py-1 px-3 rounded text-sm hover:bg-gray-700"
        >
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-500 mt-2">
        {activeTab === 'performance' 
          ? 'Monitor interaction performance and SRS compliance.'
          : 'Monitor system health for concurrent user support.'
        }
      </div>
    </div>
  );
};

export default PerformanceDashboard; 