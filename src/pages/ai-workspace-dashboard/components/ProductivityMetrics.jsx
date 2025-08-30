import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductivityMetrics = () => {
  const metrics = [
    {
      id: 'conversations',
      label: 'Conversations Today',
      value: 12,
      change: +3,
      changeType: 'increase',
      icon: 'MessageSquare',
      color: 'neural'
    },
    {
      id: 'time-saved',
      label: 'Time Saved',
      value: '2.5h',
      change: '+45m',
      changeType: 'increase',
      icon: 'Clock',
      color: 'success'
    },
    {
      id: 'models-used',
      label: 'Models Used',
      value: 4,
      change: +1,
      changeType: 'increase',
      icon: 'Bot',
      color: 'energy'
    },
    {
      id: 'integrations',
      label: 'Active Integrations',
      value: 6,
      change: 0,
      changeType: 'neutral',
      icon: 'Plug',
      color: 'quantum'
    }
  ];

  const weeklyData = [
    { day: 'Mon', conversations: 8, timeSaved: 1.2 },
    { day: 'Tue', conversations: 12, timeSaved: 2.1 },
    { day: 'Wed', conversations: 15, timeSaved: 2.8 },
    { day: 'Thu', conversations: 10, timeSaved: 1.9 },
    { day: 'Fri', conversations: 18, timeSaved: 3.2 },
    { day: 'Sat', conversations: 6, timeSaved: 1.1 },
    { day: 'Sun', conversations: 12, timeSaved: 2.5 }
  ];

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
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-error';
      default:
        return 'text-text-tertiary';
    }
  };

  const maxConversations = Math.max(...weeklyData?.map(d => d?.conversations));

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Productivity Metrics</h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-text-secondary hover:text-primary transition-colors">
            This Week
          </button>
          <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
        </div>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics?.map((metric) => (
          <div
            key={metric?.id}
            className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${getColorClasses(metric?.color)}
              `}>
                <Icon name={metric?.icon} size={16} />
              </div>
              {metric?.change !== 0 && (
                <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
                  <Icon 
                    name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span className="text-xs font-medium">
                    {typeof metric?.change === 'number' ? `+${metric?.change}` : metric?.change}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-text-primary">{metric?.value}</p>
              <p className="text-xs text-text-secondary leading-tight">{metric?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Weekly Chart */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Weekly Overview</h3>
        
        <div className="space-y-3">
          {weeklyData?.map((day, index) => (
            <div key={day?.day} className="flex items-center space-x-3">
              <span className="text-xs font-medium text-text-secondary w-8">
                {day?.day}
              </span>
              
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neural-deep to-quantum-deep rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(day?.conversations / maxConversations) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                </div>
                
                <span className="text-xs font-medium text-text-primary w-6">
                  {day?.conversations}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Clock" size={12} />
                <span>{day?.timeSaved}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Badge */}
      <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-energy-bright/10 rounded-lg border border-success/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-text-primary">Weekly Goal Achieved!</h4>
            <p className="text-xs text-text-secondary">
              You've saved over 10 hours this week using AI assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityMetrics;