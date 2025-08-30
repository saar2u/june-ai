import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelSwitcher = ({ activeModel = 'gpt-4', onModelChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Advanced reasoning and creative tasks',
      personality: 'Analytical & Creative',
      color: 'neural',
      status: 'active',
      capabilities: ['Reasoning', 'Writing', 'Analysis', 'Code'],
      avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Thoughtful and nuanced conversations',
      personality: 'Thoughtful & Ethical',
      color: 'quantum',
      status: 'available',
      capabilities: ['Ethics', 'Research', 'Writing', 'Analysis'],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Multimodal AI with visual understanding',
      personality: 'Visual & Versatile',
      color: 'energy',
      status: 'available',
      capabilities: ['Vision', 'Multimodal', 'Search', 'Code'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'llama',
      name: 'LLaMA',
      description: 'Open-source language model',
      personality: 'Technical & Precise',
      color: 'warning',
      status: 'beta',
      capabilities: ['Technical', 'Research', 'Code', 'Math'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const activeModelData = aiModels?.find(model => model?.id === activeModel);

  const getColorClasses = (color, isActive = false) => {
    const baseClasses = isActive ? 'ring-2' : '';
    switch (color) {
      case 'neural':
        return `${baseClasses} ${isActive ? 'ring-neural-deep bg-neural-deep/10' : 'hover:bg-neural-deep/5'}`;
      case 'quantum':
        return `${baseClasses} ${isActive ? 'ring-quantum-deep bg-quantum-deep/10' : 'hover:bg-quantum-deep/5'}`;
      case 'energy':
        return `${baseClasses} ${isActive ? 'ring-energy-bright bg-energy-bright/10' : 'hover:bg-energy-bright/5'}`;
      case 'warning':
        return `${baseClasses} ${isActive ? 'ring-warning bg-warning/10' : 'hover:bg-warning/5'}`;
      default:
        return baseClasses;
    }
  };

  const handleModelSelect = (modelId) => {
    onModelChange?.(modelId);
    setIsExpanded(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Active AI Model</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-text-secondary hover:text-primary"
        >
          {isExpanded ? 'Collapse' : 'Switch'}
        </Button>
      </div>
      {/* Active Model Display */}
      <div className={`
        p-4 rounded-lg border transition-all duration-300
        ${getColorClasses(activeModelData?.color, true)}
      `}>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={activeModelData?.avatar}
              alt={activeModelData?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`
              absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
              ${activeModelData?.status === 'active' ? 'bg-success animate-neural-pulse' :
                activeModelData?.status === 'available'? 'bg-quantum-medium' : 'bg-warning'
              }
            `}></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-text-primary">{activeModelData?.name}</h3>
              <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">
                Active
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-2">{activeModelData?.description}</p>
            <p className="text-xs text-text-tertiary">{activeModelData?.personality}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {activeModelData?.capabilities?.map((capability) => (
            <span
              key={capability}
              className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-md"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
      {/* Model Selection Grid */}
      <div className={`
        transition-all duration-300 overflow-hidden
        ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
      `}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aiModels?.filter(model => model?.id !== activeModel)?.map((model) => (
            <button
              key={model?.id}
              onClick={() => handleModelSelect(model?.id)}
              className={`
                p-3 rounded-lg border text-left transition-all duration-300
                ${getColorClasses(model?.color)}
                interactive-scale
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={model?.avatar}
                    alt={model?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`
                    absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white
                    ${model?.status === 'active' ? 'bg-success' :
                      model?.status === 'available'? 'bg-quantum-medium' : 'bg-warning'
                    }
                  `}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-text-primary truncate">
                    {model?.name}
                  </h4>
                  <p className="text-xs text-text-secondary truncate">
                    {model?.personality}
                  </p>
                </div>
                
                <Icon name="ArrowRight" size={16} className="text-text-tertiary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSwitcher;