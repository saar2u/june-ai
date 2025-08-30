import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeModel, setActiveModel] = useState('gpt-4');
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Workspace',
      items: [
        { path: '/homepage', label: 'Dashboard', icon: 'Home', badge: null },
        { path: '/ai-workspace-dashboard', label: 'Workspace', icon: 'Layout', badge: 'Active' },
        { path: '/conversation-theater', label: 'Conversations', icon: 'MessageSquare', badge: '3' },
      ]
    },
    {
      section: 'AI Tools',
      items: [
        { path: '/ai-model-marketplace', label: 'Model Hub', icon: 'Zap', badge: 'New' },
        { path: '/conversation-theater', label: 'Chat Theater', icon: 'Bot', badge: null },
      ]
    },
    {
      section: 'Management',
      items: [
        { path: '/administrative-console', label: 'Admin Console', icon: 'Settings', badge: null },
        { path: '/authentication-portal', label: 'Account', icon: 'User', badge: null },
      ]
    }
  ];

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', status: 'active', color: 'neural' },
    { id: 'claude', name: 'Claude', status: 'available', color: 'quantum' },
    { id: 'gemini', name: 'Gemini', status: 'available', color: 'energy' },
    { id: 'llama', name: 'LLaMA', status: 'beta', color: 'warning' },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldShowContent = !isCollapsed || isHovered;

  const NavItem = ({ item }) => (
    <Link
      to={item?.path}
      className={`
        group relative flex items-center px-3 py-2.5 rounded-lg
        transition-all duration-300 font-medium
        ${isActivePath(item?.path)
          ? 'text-primary bg-primary/10 shadow-soft border-l-2 border-primary'
          : 'text-text-secondary hover:text-primary hover:bg-muted/50'
        }
        ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
      `}
    >
      <Icon 
        name={item?.icon} 
        size={20} 
        className={`
          transition-colors duration-300 flex-shrink-0
          ${isActivePath(item?.path) ? 'text-primary' : 'text-current'}
        `}
      />
      
      <div 
        className={`
          flex items-center justify-between flex-1 ml-3
          transition-all duration-300
          ${shouldShowContent ? 'opacity-100 w-auto' : 'opacity-0 w-0 ml-0'}
        `}
      >
        <span className="text-sm whitespace-nowrap">{item?.label}</span>
        {item?.badge && (
          <span className={`
            px-2 py-0.5 text-xs font-medium rounded-full
            ${item?.badge === 'Active' ? 'bg-success/10 text-success' :
              item?.badge === 'New'? 'bg-energy-bright/10 text-energy-medium' : 'bg-muted text-text-secondary'
            }
          `}>
            {item?.badge}
          </span>
        )}
      </div>

      {isActivePath(item?.path) && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg -z-10"></div>
      )}
    </Link>
  );

  const ModelCard = ({ model }) => (
    <button
      onClick={() => setActiveModel(model?.id)}
      className={`
        w-full p-3 rounded-lg border transition-all duration-300
        ${activeModel === model?.id
          ? 'border-primary bg-primary/5 shadow-soft'
          : 'border-border hover:border-primary/30 hover:bg-muted/30'
        }
        ${shouldShowContent ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${model?.color === 'neural' ? 'bg-neural-deep/10 text-neural-deep' :
            model?.color === 'quantum' ? 'bg-quantum-deep/10 text-quantum-deep' :
            model?.color === 'energy'? 'bg-energy-bright/10 text-energy-medium' : 'bg-warning/10 text-warning'
          }
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
          <span className="text-xs text-text-secondary capitalize">
            {model?.status}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <aside 
      className={`
        fixed left-0 top-16 bottom-0 z-sidebar
        bg-card border-r border-border
        transition-all duration-300 ease-neural
        ${isCollapsed ? 'w-16' : 'w-72'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div 
              className={`
                transition-all duration-300
                ${shouldShowContent ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
              `}
            >
              <h2 className="font-semibold text-text-primary">Navigation</h2>
              <p className="text-xs text-text-secondary mt-1">
                AI-powered workspace
              </p>
            </div>
            
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="sm"
                iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                onClick={onToggleCollapse}
                className="text-text-secondary hover:text-primary flex-shrink-0"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationItems?.map((section) => (
            <div key={section?.section}>
              <h3 
                className={`
                  text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3
                  transition-all duration-300
                  ${shouldShowContent ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {section?.section}
              </h3>
              <div className="space-y-1">
                {section?.items?.map((item) => (
                  <NavItem key={item?.path} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Models Section */}
        <div className="p-4 border-t border-border">
          <div 
            className={`
              transition-all duration-300
              ${shouldShowContent ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                AI Models
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="Plus"
                className="text-text-secondary hover:text-primary w-6 h-6 p-0"
              />
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {aiModels?.map((model) => (
                <ModelCard key={model?.id} model={model} />
              ))}
            </div>
          </div>

          {/* Collapsed State Model Indicator */}
          {isCollapsed && !isHovered && (
            <div className="flex justify-center">
              <div className="w-8 h-8 neural-gradient rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="p-4 border-t border-border">
          <div 
            className={`
              flex items-center space-x-3
              transition-all duration-300
              ${shouldShowContent ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">System Online</p>
              <p className="text-xs text-text-secondary">All models active</p>
            </div>
          </div>
          
          {isCollapsed && !isHovered && (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-success rounded-full animate-neural-pulse"></div>
            </div>
          )}
        </div>
      </div>
      {/* Neural Network Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/4 right-0 w-16 h-32 opacity-3"
          viewBox="0 0 64 128"
          fill="none"
        >
          <path
            d="M32,0 Q48,32 32,64 Q16,96 32,128"
            stroke="url(#sidebar-gradient)"
            strokeWidth="1"
            fill="none"
            className="animate-neural-flow"
            strokeDasharray="5,3"
          />
          <defs>
            <linearGradient id="sidebar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;