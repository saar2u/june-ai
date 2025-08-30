import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import FeedbackAnalytics from './components/FeedbackAnalytics';
import IntegrationOverview from './components/IntegrationOverview';
import SecurityMonitoring from './components/SecurityMonitoring';

const AdministrativeConsole = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'integrations', label: 'Integrations', icon: 'Link' },
    { id: 'feedback', label: 'Feedback', icon: 'MessageSquare' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'system', label: 'System Health', icon: 'Activity' }
  ];

  const overviewMetrics = [
    {
      title: "Active Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "neural"
    },
    {
      title: "Daily Conversations",
      value: "8,934",
      change: "+8%",
      changeType: "positive",
      icon: "MessageSquare",
      color: "quantum"
    },
    {
      title: "Integration Health",
      value: "96.2%",
      change: "-2%",
      changeType: "negative",
      icon: "Link",
      color: "energy"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "0%",
      changeType: "stable",
      icon: "Activity",
      color: "success"
    },
    {
      title: "Security Score",
      value: "A+",
      change: "+1",
      changeType: "positive",
      icon: "Shield",
      color: "success"
    },
    {
      title: "User Satisfaction",
      value: "4.6/5",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      color: "warning"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "user_added",
      message: "New user Sarah Chen joined Analytics team",
      timestamp: "2025-08-30T14:20:00",
      icon: "UserPlus",
      color: "success"
    },
    {
      id: 2,
      type: "integration_error",
      message: "ServiceNow integration experiencing timeouts",
      timestamp: "2025-08-30T14:15:00",
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      id: 3,
      type: "security_alert",
      message: "Multiple failed login attempts detected",
      timestamp: "2025-08-30T14:10:00",
      icon: "Shield",
      color: "error"
    },
    {
      id: 4,
      type: "feedback_received",
      message: "High satisfaction rating from Marketing team",
      timestamp: "2025-08-30T14:05:00",
      icon: "ThumbsUp",
      color: "success"
    },
    {
      id: 5,
      type: "system_update",
      message: "AI model performance optimization completed",
      timestamp: "2025-08-30T14:00:00",
      icon: "Zap",
      color: "neural"
    }
  ];

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityColor = (color) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      neural: 'text-neural-deep',
      quantum: 'text-quantum-deep',
      energy: 'text-energy-medium'
    };
    return colors?.[color] || 'text-text-secondary';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {overviewMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Recent Activities */}
            <div className="bg-card border border-border rounded-lg shadow-soft">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Recent Activities</h3>
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View All
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {recentActivities?.map((activity) => (
                  <div key={activity?.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                        <Icon 
                          name={activity?.icon} 
                          size={18} 
                          className={getActivityColor(activity?.color)}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">{activity?.message}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {formatTime(activity?.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" iconName="UserPlus" fullWidth>
                  Add User
                </Button>
                <Button variant="outline" iconName="Settings" fullWidth>
                  System Settings
                </Button>
                <Button variant="outline" iconName="Download" fullWidth>
                  Export Data
                </Button>
                <Button variant="outline" iconName="AlertTriangle" fullWidth>
                  Security Scan
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return <UserManagementTable />;
      
      case 'integrations':
        return <IntegrationOverview />;
      
      case 'feedback':
        return <FeedbackAnalytics />;
      
      case 'security':
        return <SecurityMonitoring />;
      
      case 'system':
        return <SystemHealthMonitor />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrative Console - June AI</title>
        <meta name="description" content="Comprehensive management interface for enterprise administrators with complete oversight of user activities, system performance, and organizational AI usage patterns." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-72'} mt-16`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 neural-gradient rounded-lg flex items-center justify-center shadow-neural">
                  <Icon name="Settings" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Administrative Console</h1>
                  <p className="text-text-secondary mt-1">
                    Comprehensive management and monitoring for June AI platform
                  </p>
                </div>
              </div>

              {/* Admin Alert Banner */}
              <div className="bg-gradient-to-r from-neural-deep/10 to-quantum-deep/10 border border-neural-deep/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} className="text-neural-deep" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Administrator Access Active
                    </p>
                    <p className="text-xs text-text-secondary">
                      You have full system privileges. All actions are logged for security compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      transition-colors duration-200
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in duration-300">
              {renderTabContent()}
            </div>
          </div>
        </main>

        {/* Neural Network Background Animation */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-1/4 right-1/4 w-64 h-64 opacity-3"
            viewBox="0 0 256 256"
            fill="none"
          >
            <circle cx="128" cy="64" r="4" fill="var(--color-primary)" className="animate-neural-pulse" />
            <circle cx="64" cy="128" r="4" fill="var(--color-secondary)" className="animate-neural-pulse" />
            <circle cx="192" cy="128" r="4" fill="var(--color-accent)" className="animate-neural-pulse" />
            <circle cx="128" cy="192" r="4" fill="var(--color-primary)" className="animate-neural-pulse" />
            
            <path
              d="M128,64 L64,128 L128,192 L192,128 Z"
              stroke="url(#admin-gradient)"
              strokeWidth="1"
              fill="none"
              className="animate-neural-flow"
              strokeDasharray="8,4"
            />
            
            <defs>
              <linearGradient id="admin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};

export default AdministrativeConsole;