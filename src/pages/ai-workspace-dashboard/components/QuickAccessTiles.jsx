import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTiles = () => {
  const quickActions = [
    {
      id: 'new-conversation',
      title: 'Start New Chat',
      description: 'Begin a conversation with your preferred AI model',
      icon: 'MessageSquare',
      color: 'neural',
      path: '/conversation-theater',
      badge: null
    },
    {
      id: 'recent-conversations',
      title: 'Recent Chats',
      description: '3 active conversations',
      icon: 'History',
      color: 'quantum',
      path: '/conversation-theater',
      badge: '3'
    },
    {
      id: 'model-hub',
      title: 'AI Models',
      description: 'Explore and switch between AI agents',
      icon: 'Bot',
      color: 'energy',
      path: '/ai-model-marketplace',
      badge: 'New'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: '2 pending connections',
      icon: 'Plug',
      color: 'warning',
      path: '/ai-workspace-dashboard',
      badge: '2'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'neural':
        return 'bg-neural-deep/10 text-neural-deep border-neural-deep/20 hover:bg-neural-deep/20';
      case 'quantum':
        return 'bg-quantum-deep/10 text-quantum-deep border-quantum-deep/20 hover:bg-quantum-deep/20';
      case 'energy':
        return 'bg-energy-bright/10 text-energy-medium border-energy-bright/20 hover:bg-energy-bright/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      default:
        return 'bg-muted text-text-primary border-border hover:bg-muted/80';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
        <button className="text-sm text-text-secondary hover:text-primary transition-colors">
          Customize
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.path}
            className={`
              relative p-4 rounded-lg border transition-all duration-300
              interactive-scale group
              ${getColorClasses(action?.color)}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${action?.color === 'neural' ? 'bg-neural-deep/20' :
                  action?.color === 'quantum' ? 'bg-quantum-deep/20' :
                  action?.color === 'energy' ? 'bg-energy-bright/20' :
                  action?.color === 'warning'? 'bg-warning/20' : 'bg-muted'
                }
              `}>
                <Icon name={action?.icon} size={20} />
              </div>
              
              {action?.badge && (
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${action?.badge === 'New' ? 'bg-success/10 text-success' : 'bg-current/10 text-current'
                  }
                `}>
                  {action?.badge}
                </span>
              )}
            </div>

            <h3 className="font-semibold text-sm mb-1">{action?.title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {action?.description}
            </p>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTiles;