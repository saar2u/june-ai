import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'conversation',
      title: 'New conversation started',
      description: 'GPT-4 • Product strategy discussion',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'MessageSquare',
      color: 'neural'
    },
    {
      id: 2,
      type: 'integration',
      title: 'Slack integration updated',
      description: 'Successfully synced 12 new messages',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'Plug',
      color: 'success'
    },
    {
      id: 3,
      type: 'model',
      title: 'New AI model available',
      description: 'Claude 3.5 Sonnet is now ready to use',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Sparkles',
      color: 'energy'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Milestone reached',
      description: 'Completed 50 AI conversations this month',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Trophy',
      color: 'warning'
    },
    {
      id: 5,
      type: 'system',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Settings',
      color: 'quantum'
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'neural':
        return 'bg-neural-deep/10 text-neural-deep';
      case 'quantum':
        return 'bg-quantum-deep/10 text-quantum-deep';
      case 'energy':
        return 'bg-energy-bright/10 text-energy-medium';
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <button className="text-sm text-text-secondary hover:text-primary transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div
            key={activity?.id}
            className={`
              flex items-start space-x-3 p-3 rounded-lg transition-all duration-300
              hover:bg-muted/30 group cursor-pointer
              ${index === 0 ? 'bg-muted/20' : ''}
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${getColorClasses(activity?.color)}
            `}>
              <Icon name={activity?.icon} size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm text-text-primary truncate">
                  {activity?.title}
                </h3>
                <span className="text-xs text-text-tertiary flex-shrink-0 ml-2">
                  {getTimeAgo(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {activity?.description}
              </p>
            </div>

            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
            />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
          <span>Live activity feed • Updates every 30 seconds</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;