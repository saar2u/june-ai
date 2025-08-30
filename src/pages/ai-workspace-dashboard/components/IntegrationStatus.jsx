import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatus = () => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication platform',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000), // 5 minutes ago
      health: 100,
      icon: 'MessageCircle',
      color: 'success',
      metrics: {
        messagesProcessed: 156,
        responseTime: '0.8s',
        uptime: '99.9%'
      }
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Collaboration and meetings',
      status: 'connected',
      lastSync: new Date(Date.now() - 600000), // 10 minutes ago
      health: 95,
      icon: 'Video',
      color: 'success',
      metrics: {
        messagesProcessed: 89,
        responseTime: '1.2s',
        uptime: '99.5%'
      }
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      description: 'IT service management',
      status: 'syncing',
      lastSync: new Date(Date.now() - 120000), // 2 minutes ago
      health: 85,
      icon: 'Settings',
      color: 'warning',
      metrics: {
        ticketsProcessed: 23,
        responseTime: '2.1s',
        uptime: '98.2%'
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Code repository and collaboration',
      status: 'error',
      lastSync: new Date(Date.now() - 1800000), // 30 minutes ago
      health: 0,
      icon: 'Code',
      color: 'error',
      metrics: {
        commitsProcessed: 0,
        responseTime: 'N/A',
        uptime: '0%'
      }
    },
    {
      id: 'sap',
      name: 'SAP',
      description: 'Enterprise resource planning',
      status: 'pending',
      lastSync: null,
      health: 0,
      icon: 'Database',
      color: 'quantum',
      metrics: {
        recordsProcessed: 0,
        responseTime: 'N/A',
        uptime: 'N/A'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success/10';
      case 'syncing':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-text-secondary bg-muted';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-success';
    if (health >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Integration Status</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          className="text-text-secondary hover:text-primary"
        >
          Add Integration
        </Button>
      </div>
      <div className="space-y-4">
        {integrations?.map((integration) => (
          <div
            key={integration?.id}
            className={`
              p-4 rounded-lg border transition-all duration-300 cursor-pointer
              ${selectedIntegration === integration?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }
            `}
            onClick={() => setSelectedIntegration(
              selectedIntegration === integration?.id ? null : integration?.id
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${integration?.color === 'success' ? 'bg-success/10 text-success' :
                    integration?.color === 'warning' ? 'bg-warning/10 text-warning' :
                    integration?.color === 'error' ? 'bg-error/10 text-error' :
                    integration?.color === 'quantum'? 'bg-quantum-deep/10 text-quantum-deep' : 'bg-muted text-text-secondary'
                  }
                `}>
                  <Icon name={integration?.icon} size={20} />
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">
                    {integration?.name}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {integration?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`
                    inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                    ${getStatusColor(integration?.status)}
                  `}>
                    <Icon 
                      name={getStatusIcon(integration?.status)} 
                      size={12}
                      className={integration?.status === 'syncing' ? 'animate-spin' : ''}
                    />
                    <span className="capitalize">{integration?.status}</span>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1">
                    {getTimeAgo(integration?.lastSync)}
                  </p>
                </div>

                {integration?.health > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          integration?.health >= 95 ? 'bg-success' :
                          integration?.health >= 80 ? 'bg-warning': 'bg-error'
                        }`}
                        style={{ width: `${integration?.health}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${getHealthColor(integration?.health)}`}>
                      {integration?.health}%
                    </span>
                  </div>
                )}

                <Icon 
                  name={selectedIntegration === integration?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-tertiary" 
                />
              </div>
            </div>

            {/* Expanded Details */}
            <div className={`
              transition-all duration-300 overflow-hidden
              ${selectedIntegration === integration?.id ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'}
            `}>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">
                    {integration?.metrics?.messagesProcessed || integration?.metrics?.ticketsProcessed || integration?.metrics?.commitsProcessed || integration?.metrics?.recordsProcessed}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {integration?.id === 'servicenow' ? 'Tickets' :
                     integration?.id === 'github' ? 'Commits' :
                     integration?.id === 'sap'? 'Records' : 'Messages'} Processed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">
                    {integration?.metrics?.responseTime}
                  </p>
                  <p className="text-xs text-text-secondary">Response Time</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-text-primary">
                    {integration?.metrics?.uptime}
                  </p>
                  <p className="text-xs text-text-secondary">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-success">3</p>
            <p className="text-xs text-text-secondary">Connected</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-warning">1</p>
            <p className="text-xs text-text-secondary">Syncing</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-error">1</p>
            <p className="text-xs text-text-secondary">Issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;