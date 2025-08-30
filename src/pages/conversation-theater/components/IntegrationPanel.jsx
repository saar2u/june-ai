import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationPanel = ({ isOpen, onClose, integrations, onIntegrationToggle }) => {
  const [activeTab, setActiveTab] = useState('connected');

  const tabs = [
    { id: 'connected', label: 'Connected', icon: 'Link' },
    { id: 'available', label: 'Available', icon: 'Plus' },
    { id: 'recent', label: 'Recent Data', icon: 'Clock' }
  ];

  const mockIntegrations = [
    {
      id: 'servicenow',
      name: 'ServiceNow',
      description: 'IT Service Management',
      icon: 'Settings',
      status: 'connected',
      lastSync: '2 minutes ago',
      dataCount: 15,
      color: 'success',
      recentData: [
        { type: 'ticket', title: 'Network connectivity issue', id: 'INC0012345' },
        { type: 'ticket', title: 'Software installation request', id: 'REQ0067890' }
      ]
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team Communication',
      icon: 'MessageSquare',
      status: 'connected',
      lastSync: '5 minutes ago',
      dataCount: 8,
      color: 'quantum',
      recentData: [
        { type: 'message', title: 'Project update from #dev-team', id: 'msg_001' },
        { type: 'message', title: 'Meeting reminder in #general', id: 'msg_002' }
      ]
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Collaboration Platform',
      icon: 'Users',
      status: 'available',
      lastSync: null,
      dataCount: 0,
      color: 'neural',
      recentData: []
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Project Management',
      icon: 'Kanban',
      status: 'available',
      lastSync: null,
      dataCount: 0,
      color: 'warning',
      recentData: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success bg-success/10 border-success/20';
      case 'syncing': return 'text-warning bg-warning/10 border-warning/20';
      case 'error': return 'text-error bg-error/10 border-error/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getIntegrationColor = (color) => {
    switch (color) {
      case 'success': return 'text-success bg-success/10';
      case 'quantum': return 'text-quantum-deep bg-quantum-deep/10';
      case 'neural': return 'text-neural-deep bg-neural-deep/10';
      case 'warning': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const filteredIntegrations = mockIntegrations?.filter(integration => {
    if (activeTab === 'connected') return integration?.status === 'connected';
    if (activeTab === 'available') return integration?.status === 'available';
    return integration?.status === 'connected' && integration?.recentData?.length > 0;
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-overlay"
          onClick={onClose}
        ></div>
      )}
      {/* Panel */}
      <div className={`
        fixed top-16 right-0 bottom-0 w-96 bg-card border-l border-border z-sidebar
        transform transition-transform duration-300 ease-neural
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Integrations</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
                className="text-text-secondary hover:text-primary"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 flex-1 justify-center
                    ${activeTab === tab?.id
                      ? 'bg-card text-primary shadow-soft'
                      : 'text-text-secondary hover:text-text-primary'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={14} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'recent' ? (
              <div className="space-y-4">
                {filteredIntegrations?.map((integration) => (
                  <div key={integration?.id} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        ${getIntegrationColor(integration?.color)}
                      `}>
                        <Icon name={integration?.icon} size={14} />
                      </div>
                      <span className="font-medium text-sm">{integration?.name}</span>
                    </div>
                    
                    <div className="space-y-2 ml-8">
                      {integration?.recentData?.map((item, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-text-primary">
                                {item?.title}
                              </p>
                              <p className="text-xs text-text-secondary mt-1">
                                {item?.type?.toUpperCase()} • {item?.id}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="ExternalLink"
                              className="h-6 w-6 p-0 text-text-tertiary hover:text-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIntegrations?.map((integration) => (
                  <div
                    key={integration?.id}
                    className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${getIntegrationColor(integration?.color)}
                      `}>
                        <Icon name={integration?.icon} size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm text-text-primary">
                            {integration?.name}
                          </h3>
                          <div className={`
                            px-2 py-1 rounded-full text-xs font-medium border
                            ${getStatusColor(integration?.status)}
                          `}>
                            {integration?.status}
                          </div>
                        </div>
                        
                        <p className="text-xs text-text-secondary mb-3">
                          {integration?.description}
                        </p>
                        
                        {integration?.status === 'connected' ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-text-secondary">Last sync:</span>
                              <span className="text-text-primary">{integration?.lastSync}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-text-secondary">Data points:</span>
                              <span className="text-text-primary">{integration?.dataCount}</span>
                            </div>
                            <div className="flex space-x-2 mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                iconName="RefreshCw"
                                className="flex-1 text-xs"
                              >
                                Sync
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                iconName="Settings"
                                className="text-text-secondary hover:text-primary"
                              />
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            iconName="Plus"
                            iconPosition="left"
                            fullWidth
                            className="text-xs"
                            onClick={() => onIntegrationToggle?.(integration?.id)}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              fullWidth
              className="text-xs"
            >
              Browse More Integrations
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationPanel;