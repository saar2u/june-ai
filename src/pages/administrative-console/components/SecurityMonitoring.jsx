import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SecurityMonitoring = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const securityMetrics = [
    {
      title: "Security Score",
      value: "A+",
      description: "Overall security rating",
      icon: "Shield",
      color: "success",
      trend: "stable"
    },
    {
      title: "Failed Login Attempts",
      value: "12",
      description: "Last 24 hours",
      icon: "AlertTriangle",
      color: "warning",
      trend: "down"
    },
    {
      title: "Active Sessions",
      value: "156",
      description: "Currently logged in users",
      icon: "Users",
      color: "neural",
      trend: "up"
    },
    {
      title: "Suspicious Activities",
      value: "3",
      description: "Flagged for review",
      icon: "Eye",
      color: "error",
      trend: "stable"
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: "login_failure",
      severity: "medium",
      user: "unknown@external.com",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      timestamp: "2025-08-30T14:15:00",
      location: "New York, US",
      status: "investigating"
    },
    {
      id: 2,
      type: "permission_change",
      severity: "high",
      user: "admin@company.com",
      description: "Admin privileges granted to new user account",
      timestamp: "2025-08-30T13:45:00",
      location: "San Francisco, US",
      status: "approved"
    },
    {
      id: 3,
      type: "unusual_access",
      severity: "low",
      user: "sarah.chen@company.com",
      description: "Access from new device/location detected",
      timestamp: "2025-08-30T12:30:00",
      location: "London, UK",
      status: "verified"
    },
    {
      id: 4,
      type: "data_export",
      severity: "medium",
      user: "marcus.r@company.com",
      description: "Large data export operation initiated",
      timestamp: "2025-08-30T11:20:00",
      location: "Chicago, US",
      status: "monitoring"
    },
    {
      id: 5,
      type: "api_anomaly",
      severity: "high",
      user: "system",
      description: "Unusual API request patterns detected",
      timestamp: "2025-08-30T10:45:00",
      location: "Server Farm",
      status: "blocked"
    }
  ];

  const complianceStatus = [
    {
      standard: "SOC 2 Type II",
      status: "compliant",
      lastAudit: "2025-07-15",
      nextAudit: "2026-07-15",
      score: 98
    },
    {
      standard: "GDPR",
      status: "compliant",
      lastAudit: "2025-06-20",
      nextAudit: "2026-06-20",
      score: 96
    },
    {
      standard: "ISO 27001",
      status: "compliant",
      lastAudit: "2025-05-10",
      nextAudit: "2026-05-10",
      score: 94
    },
    {
      standard: "HIPAA",
      status: "pending",
      lastAudit: "2025-03-15",
      nextAudit: "2025-09-15",
      score: 89
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      investigating: { color: 'bg-warning/10 text-warning', label: 'Investigating' },
      approved: { color: 'bg-success/10 text-success', label: 'Approved' },
      verified: { color: 'bg-neural-deep/10 text-neural-deep', label: 'Verified' },
      monitoring: { color: 'bg-energy-bright/10 text-energy-medium', label: 'Monitoring' },
      blocked: { color: 'bg-error/10 text-error', label: 'Blocked' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.monitoring;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getComplianceStatus = (status) => {
    const statusConfig = {
      compliant: { color: 'bg-success/10 text-success', label: 'Compliant', icon: 'CheckCircle' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending Review', icon: 'Clock' },
      'non-compliant': { color: 'bg-error/10 text-error', label: 'Non-Compliant', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <div className="flex items-center space-x-1">
        <Icon name={config?.icon} size={14} className={config?.color?.split(' ')?.[1]} />
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
          {config?.label}
        </span>
      </div>
    );
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'login_failure': return 'UserX';
      case 'permission_change': return 'Shield';
      case 'unusual_access': return 'MapPin';
      case 'data_export': return 'Download';
      case 'api_anomaly': return 'Zap';
      default: return 'AlertTriangle';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Security Monitoring</h3>
          <p className="text-sm text-text-secondary mt-1">
            Real-time security events and compliance monitoring
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-full sm:w-40"
          />
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
          <Button variant="default" iconName="Shield">
            Security Scan
          </Button>
        </div>
      </div>
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                ${metric?.color === 'success' ? 'bg-success/10 text-success' :
                  metric?.color === 'warning' ? 'bg-warning/10 text-warning' :
                  metric?.color === 'error'? 'bg-error/10 text-error' : 'bg-neural-deep/10 text-neural-deep'
                }`}>
                <Icon name={metric?.icon} size={24} />
              </div>
              <Icon 
                name={metric?.trend === 'up' ? 'TrendingUp' : metric?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={metric?.trend === 'up' ? 'text-success' : metric?.trend === 'down' ? 'text-error' : 'text-text-secondary'}
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{metric?.value}</h3>
              <p className="text-sm font-medium text-text-primary">{metric?.title}</p>
              <p className="text-xs text-text-secondary mt-1">{metric?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Events */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-text-primary">Recent Security Events</h4>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All Events
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {securityEvents?.map((event) => (
            <div key={event?.id} className="p-6 hover:bg-muted/20 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityBg(event?.severity)}`}>
                  <Icon name={getEventIcon(event?.type)} size={18} className={getSeverityColor(event?.severity)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBg(event?.severity)} ${getSeverityColor(event?.severity)}`}>
                        {event?.severity?.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-text-primary">{event?.user}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(event?.status)}
                      <span className="text-xs text-text-secondary">
                        {formatTime(event?.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-text-primary mb-2">{event?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-text-secondary">
                      <Icon name="MapPin" size={12} />
                      <span>{event?.location}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        Details
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Flag">
                        Escalate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Status */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <h4 className="font-semibold text-text-primary">Compliance Status</h4>
          <p className="text-sm text-text-secondary mt-1">
            Current compliance status across security standards
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceStatus?.map((compliance, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-text-primary">{compliance?.standard}</h5>
                  {getComplianceStatus(compliance?.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Compliance Score</span>
                    <span className="font-medium text-text-primary">{compliance?.score}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Last Audit</span>
                    <span className="text-text-primary">{formatDate(compliance?.lastAudit)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Next Audit</span>
                    <span className="text-text-primary">{formatDate(compliance?.nextAudit)}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div 
                      className={`h-2 rounded-full ${compliance?.score >= 95 ? 'bg-success' : compliance?.score >= 90 ? 'bg-warning' : 'bg-error'}`}
                      style={{ width: `${compliance?.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h4 className="font-semibold text-text-primary mb-4">Security Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" iconName="Lock" fullWidth>
            Force Logout All
          </Button>
          <Button variant="outline" size="sm" iconName="UserX" fullWidth>
            Block Suspicious IPs
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
            Rotate API Keys
          </Button>
          <Button variant="outline" size="sm" iconName="AlertTriangle" fullWidth>
            Emergency Lockdown
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoring;