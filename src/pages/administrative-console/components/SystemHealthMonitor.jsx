import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealthMonitor = () => {
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const systemMetrics = [
    {
      name: "API Response Time",
      value: "142ms",
      status: "healthy",
      trend: "stable",
      target: "< 200ms",
      icon: "Zap"
    },
    {
      name: "Database Performance",
      value: "98.7%",
      status: "healthy",
      trend: "improving",
      target: "> 95%",
      icon: "Database"
    },
    {
      name: "AI Model Availability",
      value: "99.9%",
      status: "healthy",
      trend: "stable",
      target: "> 99%",
      icon: "Bot"
    },
    {
      name: "Integration Health",
      value: "94.2%",
      status: "warning",
      trend: "declining",
      target: "> 95%",
      icon: "Link"
    },
    {
      name: "Security Score",
      value: "A+",
      status: "healthy",
      trend: "stable",
      target: "A or higher",
      icon: "Shield"
    },
    {
      name: "Storage Usage",
      value: "67%",
      status: "healthy",
      trend: "increasing",
      target: "< 80%",
      icon: "HardDrive"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "ServiceNow integration experiencing intermittent timeouts",
      timestamp: "2025-08-30T14:15:00",
      resolved: false
    },
    {
      id: 2,
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: "2025-08-30T13:30:00",
      resolved: true
    },
    {
      id: 3,
      type: "error",
      message: "High memory usage detected on AI processing nodes",
      timestamp: "2025-08-30T12:45:00",
      resolved: true
    },
    {
      id: 4,
      type: "success",
      message: "Security scan completed - no vulnerabilities found",
      timestamp: "2025-08-30T11:00:00",
      resolved: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return 'TrendingUp';
      case 'declining': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-neural-deep';
      case 'success': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">System Health Monitor</h3>
          <p className="text-sm text-text-secondary mt-1">
            Real-time system performance and health metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-text-secondary">
            Last updated: {refreshTime?.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={metric?.icon} size={20} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{metric?.name}</span>
              </div>
              <Icon 
                name={getStatusIcon(metric?.status)} 
                size={16} 
                className={getStatusColor(metric?.status)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-text-primary">{metric?.value}</span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(metric?.trend)} 
                    size={14} 
                    className={getStatusColor(metric?.status)}
                  />
                  <span className={`text-xs ${getStatusColor(metric?.status)}`}>
                    {metric?.trend}
                  </span>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                Target: {metric?.target}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Alerts */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-text-primary">Recent Alerts</h4>
            <Button variant="ghost" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {recentAlerts?.map((alert) => (
            <div key={alert?.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={18} 
                  className={`mt-0.5 ${getAlertColor(alert?.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-primary">{alert?.message}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-secondary">
                        {formatTime(alert?.timestamp)}
                      </span>
                      {alert?.resolved && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" iconName="ExternalLink" fullWidth>
            View All Alerts
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
        <h4 className="font-semibold text-text-primary mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" iconName="Play" fullWidth>
            Run Diagnostics
          </Button>
          <Button variant="outline" size="sm" iconName="Download" fullWidth>
            Export Logs
          </Button>
          <Button variant="outline" size="sm" iconName="Wrench" fullWidth>
            System Maintenance
          </Button>
          <Button variant="outline" size="sm" iconName="AlertTriangle" fullWidth>
            Emergency Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;