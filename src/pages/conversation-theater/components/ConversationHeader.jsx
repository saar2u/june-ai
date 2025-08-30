import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ 
  currentModel, 
  onModelChange, 
  onNewConversation,
  onToggleSidebar,
  isSidebarOpen 
}) => {
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

  const aiModels = [
    { 
      id: 'gpt-4', 
      name: 'GPT-4', 
      description: 'Advanced reasoning and analysis',
      color: 'neural',
      status: 'active'
    },
    { 
      id: 'claude', 
      name: 'Claude', 
      description: 'Thoughtful and nuanced responses',
      color: 'quantum',
      status: 'available'
    },
    { 
      id: 'gemini', 
      name: 'Gemini', 
      description: 'Multimodal understanding',
      color: 'energy',
      status: 'available'
    },
    { 
      id: 'llama', 
      name: 'LLaMA', 
      description: 'Open-source intelligence',
      color: 'warning',
      status: 'beta'
    }
  ];

  const handleModelSelect = (model) => {
    onModelChange(model);
    setIsModelSelectorOpen(false);
  };

  const getModelColor = (color) => {
    switch (color) {
      case 'neural': return 'bg-neural-deep/10 text-neural-deep border-neural-deep/20';
      case 'quantum': return 'bg-quantum-deep/10 text-quantum-deep border-quantum-deep/20';
      case 'energy': return 'bg-energy-bright/10 text-energy-medium border-energy-bright/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            onClick={onToggleSidebar}
            className="lg:hidden text-text-secondary hover:text-primary"
          />
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300
                  ${getModelColor(currentModel?.color)}
                  hover:shadow-soft
                `}
              >
                <Icon name="Bot" size={18} />
                <span className="font-medium text-sm">{currentModel?.name}</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    isModelSelectorOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Model Selector Dropdown */}
              {isModelSelectorOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevated z-dropdown">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-2">
                      Switch AI Model
                    </div>
                    {aiModels?.map((model) => (
                      <button
                        key={model?.id}
                        onClick={() => handleModelSelect(model)}
                        className={`
                          w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                          ${currentModel?.id === model?.id 
                            ? 'bg-primary/5 border border-primary/20' :'hover:bg-muted/50'
                          }
                        `}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${getModelColor(model?.color)}
                        `}>
                          <Icon name="Bot" size={16} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{model?.name}</span>
                            <div className={`
                              w-2 h-2 rounded-full
                              ${model?.status === 'active' ? 'bg-success animate-neural-pulse' :
                                model?.status === 'available'? 'bg-quantum-medium' : 'bg-warning'
                              }
                            `}></div>
                          </div>
                          <p className="text-xs text-text-secondary">{model?.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-border"></div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
              <span className="text-sm text-text-secondary">Connected</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            onClick={onNewConversation}
            className="text-text-secondary hover:text-primary"
          >
            New Chat
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Search"
            className="text-text-secondary hover:text-primary"
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            className="text-text-secondary hover:text-primary"
          />
        </div>
      </div>
      {/* Click outside to close dropdown */}
      {isModelSelectorOpen && (
        <div 
          className="fixed inset-0 z-backdrop" 
          onClick={() => setIsModelSelectorOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ConversationHeader;