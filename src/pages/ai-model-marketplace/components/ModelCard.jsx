import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ModelCard = ({ model, onSelect, onPreview, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'beta': return 'bg-warning text-warning-foreground';
      case 'coming-soon': return 'bg-muted text-muted-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getCapabilityColor = (score) => {
    if (score >= 90) return 'bg-success';
    if (score >= 70) return 'bg-energy-bright';
    if (score >= 50) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div 
      className={`
        relative bg-card border rounded-xl p-6 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-primary shadow-elevated ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50 hover:shadow-soft'
        }
        ${isHovered ? 'transform scale-[1.02]' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(model)}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(model?.status)}`}>
          {model?.status?.replace('-', ' ')?.toUpperCase()}
        </span>
      </div>
      {/* Model Avatar & Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${model?.gradient} shadow-soft`}>
            <Icon name={model?.icon} size={32} className="text-white" />
          </div>
          {model?.isNew && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-energy-bright rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={10} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">{model?.name}</h3>
          <p className="text-sm text-text-secondary mb-2">{model?.category}</p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon 
                  key={i}
                  name="Star" 
                  size={12} 
                  className={i < Math.floor(model?.rating) ? 'text-warning fill-current' : 'text-muted'} 
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary">({model?.reviews})</span>
          </div>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{model?.description}</p>
      {/* Capabilities */}
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Capabilities</h4>
        {model?.capabilities?.map((capability) => (
          <div key={capability?.name} className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">{capability?.name}</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getCapabilityColor(capability?.score)}`}
                  style={{ width: `${capability?.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-text-primary w-8">{capability?.score}%</span>
            </div>
          </div>
        ))}
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{model?.responseTime}</div>
          <div className="text-xs text-text-secondary">Response</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{model?.accuracy}%</div>
          <div className="text-xs text-text-secondary">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{model?.uptime}%</div>
          <div className="text-xs text-text-secondary">Uptime</div>
        </div>
      </div>
      {/* Use Cases */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Best For</h4>
        <div className="flex flex-wrap gap-1">
          {model?.useCases?.slice(0, 3)?.map((useCase) => (
            <span key={useCase} className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-md">
              {useCase}
            </span>
          ))}
          {model?.useCases?.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-md">
              +{model?.useCases?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Play"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onPreview(model);
          }}
          className="flex-1"
        >
          Preview
        </Button>
        <Button
          variant={isSelected ? "default" : "secondary"}
          size="sm"
          iconName={isSelected ? "Check" : "Plus"}
          iconPosition="left"
          className="flex-1"
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </div>
      {/* Integration Indicators */}
      {model?.integrations && model?.integrations?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">Integrations</span>
            <div className="flex items-center space-x-1">
              {model?.integrations?.slice(0, 3)?.map((integration) => (
                <div key={integration} className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                  <Icon name="Link" size={10} className="text-text-secondary" />
                </div>
              ))}
              {model?.integrations?.length > 3 && (
                <span className="text-xs text-text-secondary">+{model?.integrations?.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCard;