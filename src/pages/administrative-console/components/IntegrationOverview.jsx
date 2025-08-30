import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const IntegrationOverview = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'error', label: 'Error' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const integrations = [
    {
      id: 1,
      name: "ServiceNow",
      type: "ITSM Platform",
      status: "active",
      users: 45,
      lastSync: "2025-08-30T14:20:00",
      health: 94,
      requests: 1247,
      icon: "Wrench",
      color: "neural"
    },
    {
      id: 2,
      name: "Microsoft Teams",
      type: "Communication",
      status: "active",
      users: 78,
      lastSync: "2025-08-30T14:22:00",
      health: 98,
      requests: 2156,
      icon: "MessageSquare",
      color: "quantum"
    },
    {
      id: 3,
      name: "Slack",
      type: "Communication",
      status: "active",
      users: 52,
      lastSync: "2025-08-30T14:18:00",
      health: 96,
      requests: 1834,
      icon: "Hash",
      color: "energy"
    },
    {
      id: 4,
      name: "SAP ERP",
      type: "Enterprise Resource",
      status: "pending",
      users: 0,
      lastSync: null,
      health: 0,
      requests: 0,
      icon: "Building",
      color: "warning"
    },
    {
      id: 5,
      name: "ManageEngine",
      type: "IT Management",
      status: "error",
      users: 23,
      lastSync: "2025-08-30T12:45:00",
      health: 67,
      requests: 456,
      icon: "Settings",
      color: "error"
    },
    {
      id: 6,
      name: "Jira",
      type: "Project Management",
      status: "maintenance",
      users: 34,
      lastSync: "2025-08-30T13:30:00",
      health: 85,
      requests: 892,
      icon: "Kanban",
      color: "neural"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      integration: "Salesforce CRM",
      requestedBy: "Sarah Chen",
      department: "Sales",
      requestDate: "2025-08-30T10:30:00",
      permissions: ["Read contacts", "Create leads", "Update opportunities"],
      priority: "high"
    },
    {
      id: 2,
      integration: "GitHub Enterprise",
      requestedBy: "Marcus Rodriguez",
      department: "Engineering",
      requestDate: "2025-08-30T09:15:00",
      permissions: ["Read repositories", "Create issues", "Manage webhooks"],
      priority: "medium"
    },
    {
      id: 3,
      integration: "HubSpot Marketing",
      requestedBy: "David Kim",
      department: "Marketing",
      requestDate: "2025-08-29T16:45:00",
      permissions: ["Read campaigns", "Create contacts", "Send emails"],
      priority: "low"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active', icon: 'CheckCircle' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending', icon: 'Clock' },
      error: { color: 'bg-error/10 text-error', label: 'Error', icon: 'XCircle' },
      maintenance: { color: 'bg-neural-deep/10 text-neural-deep', label: 'Maintenance', icon: 'Wrench' }
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

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-success';
    if (health >= 80) return 'text-warning';
    return 'text-error';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-error/10 text-error', label: 'High' },
      medium: { color: 'bg-warning/10 text-warning', label: 'Medium' },
      low: { color: 'bg-success/10 text-success', label: 'Low' }
    };
    
    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatLastSync = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const formatRequestDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredIntegrations = integrations?.filter(integration => 
    statusFilter === 'all' || integration?.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Integration Overview</h3>
          <p className="text-sm text-text-secondary mt-1">
            Manage and monitor third-party application integrations
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-40"
          />
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Integration
          </Button>
        </div>
      </div>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations?.map((integration) => (
          <div key={integration?.id} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${integration?.color === 'neural' ? 'bg-neural-deep/10 text-neural-deep' :
                    integration?.color === 'quantum' ? 'bg-quantum-deep/10 text-quantum-deep' :
                    integration?.color === 'energy' ? 'bg-energy-bright/10 text-energy-medium' :
                    integration?.color === 'warning'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                  <Icon name={integration?.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{integration?.name}</h4>
                  <p className="text-xs text-text-secondary">{integration?.type}</p>
                </div>
              </div>
              {getStatusBadge(integration?.status)}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Active Users</span>
                <span className="text-sm font-medium text-text-primary">{integration?.users}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Health Score</span>
                <span className={`text-sm font-medium ${getHealthColor(integration?.health)}`}>
                  {integration?.health}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Requests (24h)</span>
                <span className="text-sm font-medium text-text-primary">
                  {integration?.requests?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Last Sync</span>
                <span className="text-sm text-text-secondary">
                  {formatLastSync(integration?.lastSync)}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" iconName="Settings" fullWidth>
                Configure
              </Button>
              <Button variant="ghost" size="sm" iconName="BarChart3" fullWidth>
                Analytics
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pending Approvals */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-text-primary">Pending Approvals</h4>
              <p className="text-sm text-text-secondary mt-1">
                Integration requests awaiting administrator approval
              </p>
            </div>
            <span className="px-3 py-1 text-sm font-medium bg-warning/10 text-warning rounded-full">
              {pendingApprovals?.length} pending
            </span>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {pendingApprovals?.map((approval) => (
            <div key={approval?.id} className="p-6 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-text-primary">{approval?.integration}</h5>
                    {getPriorityBadge(approval?.priority)}
                  </div>
                  <p className="text-sm text-text-secondary">
                    Requested by <span className="font-medium">{approval?.requestedBy}</span> from {approval?.department}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {formatRequestDate(approval?.requestDate)}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">Requested Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {approval?.permissions?.map((permission, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-md">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="default" size="sm" iconName="Check">
                  Approve
                </Button>
                <Button variant="destructive" size="sm" iconName="X">
                  Reject
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Review Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-success mb-1">
            {integrations?.filter(i => i?.status === 'active')?.length}
          </div>
          <div className="text-sm text-text-secondary">Active Integrations</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {integrations?.reduce((sum, i) => sum + i?.users, 0)}
          </div>
          <div className="text-sm text-text-secondary">Total Users</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {integrations?.reduce((sum, i) => sum + i?.requests, 0)?.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">Daily Requests</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center shadow-soft">
          <div className="text-2xl font-bold text-warning mb-1">
            {pendingApprovals?.length}
          </div>
          <div className="text-sm text-text-secondary">Pending Approvals</div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationOverview;